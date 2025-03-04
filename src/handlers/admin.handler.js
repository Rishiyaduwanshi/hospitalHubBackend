import Admin from '../models/admin.model.js';
import Hospital from '../models/hospital.model.js';
import { AppError } from '../helpers/appError.js';
import sendResponse from '../helpers/appResponse.js';
import {
  isUsernameOrEmailExist,
  hashPassword,
  isPasswordLengthValid,
  isValidEmail,
  isPasswordMatch,
} from '../services/admin.service.js';
import { generateToken } from '../helpers/jwt.js';
import sendEmail from '../services/mail.service.js';
import signupEmailTemplate from '../templates/signup.temp.js';
import adminApprovalEmailTemplate from '../templates/adminApproval.temp.js';
import approvalEmailTemplate from '../templates/approval.temp.js';
import fs from 'fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = packageJson.version;

const cookieOptions = {
  httpOnly: true,
  maxAge:
    process.env.MODE === 'DEV' ? 30 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000,
  secure: process.env.MODE === 'DEV' ? false : true,
  sameSite: 'none',
};

const signupAdmin = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      throw new AppError({
        message: 'Please provide all fields',
        statusCode: 400,
      });
    }

    const validEmail = isValidEmail(email);
    if (!validEmail) {
      throw new AppError({
        message: 'Please enter a valid email address',
        statusCode: 400,
      });
    }

    if (!isPasswordLengthValid(password, 8)) {
      throw new AppError({
        message: 'Password must be at least 8 characters',
        statusCode: 400,
      });
    }

    if (await isUsernameOrEmailExist(email, username)) {
      throw new AppError({
        message: 'Email or Username already exist',
        statusCode: 400,
      });
    }

    await sendEmail({
      to: email,
      subject: 'Welcome to HospitalHub',
      html: signupEmailTemplate(name.trim().split(' ')[0]),
    });
    await sendEmail({
      to: process.env.MAIL_USERNAME,
      subject: 'New Admin Signup Request',
      html: adminApprovalEmailTemplate(
        name,
        email,
        `${req.protocol}://${req.get('host')}/api/v${version}/admin/approve/${email}`
      ),
    });

    const newAdmin = await Admin.create({
      name,
      email,
      username,
      password: await hashPassword(password),
    });


    newAdmin.save();
    sendResponse(res, {
      statusCode: 201,
      message: 'Admin created successfully',
      data: {
        name: newAdmin.name,
        email: newAdmin.email,
        username: newAdmin.username,
        tala: process.env.MODE === 'DEV' ? tala : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signinAdmin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      throw new AppError({
        message: 'Please provide all fields',
        statusCode: 400,
      });
    }

    const trimAndLowercaseUsernameOrEmail = usernameOrEmail
      .trim()
      .toLowerCase();

    const admin = await Admin.findOne({
      $or: [
        { email: trimAndLowercaseUsernameOrEmail },
        { username: trimAndLowercaseUsernameOrEmail },
      ],
    });

    if (!admin.isApproved)
      throw new AppError({
        message:
          'Your account has not been approved yet.Please contact the administrator or send an email to contact@rishiyaduwanshi.me',
        statusCode: 403,
      });

    if (!admin || !(await isPasswordMatch(password, admin.password))) {
      throw new AppError({
        message: 'Invalid credentials',
        statusCode: 401,
      });
    }

    const tala = generateToken({
      id: admin._id,
      username: admin.username,
    });

    res.cookie('tala', tala, cookieOptions);

    sendResponse(res, {
      statusCode: 200,
      message: 'Admin signed in successfully',
      data: {
        name: admin.name,
        username: admin.username,
        tala: process.env.MODE === 'DEV' ? tala : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie('tala');
    sendResponse(res, {
      statusCode: 200,
      message: 'Signout successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getHospitalStats = async (req, res, next) => {
  try {
    const totalHospitals = await Hospital.countDocuments();
    const totalDoctors = await Hospital.aggregate([
      { $group: { _id: null, totalDoctors: { $sum: '$numberOfDoctors' } } },
    ]);

    sendResponse(res, {
      statusCode: 200,
      message: 'Hospital stats fetched successfully',
      data: {
        totalHospitals,
        totalDoctors:
          totalDoctors.length > 0 ? totalDoctors[0].totalDoctors : 0,
      },
    });
  } catch (error) {
    next(new AppError({ message: 'Failed to fetch stats', statusCode: 500 }));
  }
};
export const approveAdmin = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return next(
        new AppError({ message: 'Please provide email', statusCode: 400 })
      );
    }

    const approvedAdmin = await Admin.findOneAndUpdate(
      { email },
      { isApproved: true },
      { new: true, runValidators: true }
    );

    if (!approvedAdmin) {
      return next(
        new AppError({ message: 'Admin not found', statusCode: 404 })
      );
    }

    const name = approvedAdmin.name;
    try {
      await sendEmail({
        to: email,
        subject: 'Your admin account has been approved.',
        html: approvalEmailTemplate(name, `${req.header.origin}/signin`),
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return next(
        new AppError({
          message: 'Admin approved, but email could not be sent.',
          statusCode: 500,
        })
      );
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'Admin approved successfully and email sent.',
    });
  } catch (error) {
    next(error);
  }
};

export { signupAdmin, signinAdmin, signoutAdmin };
