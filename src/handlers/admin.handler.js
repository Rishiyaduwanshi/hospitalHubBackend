import Admin from '../models/admin.model.js';
import { AppError } from '../helpers/appError.js';
import sendResponse from '../helpers/appResponse.js';
import {
  isUsernameOrEmailExist,
  hashPassword,
  isPasswordLengthValid,
  isValidEmail,
} from '../services/admin.service.js';
import { generateToken } from '../helpers/jwt.js';

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

    const newAdmin = await Admin.create({
      name,
      email,
      username,
      password: await hashPassword(password),
    });

    const tala = generateToken({
      id: newAdmin._id,
      username: newAdmin.username,
    });

    res.cookie('tala', tala, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: process.env.MODE === 'DEV' ? false : true,
      sameSite: 'Strict',
    });

    
    newAdmin.save();
    sendResponse(res, {
      statusCode: 201,
      message: 'Admin created successfully',
      data: {
        name: newAdmin.name,
        email: newAdmin.email,
        username: newAdmin.username,
        tala : process.env.MODE === 'DEV' ? tala : null,    
      },
    });
  } catch (error) {
    next(error);
  }
};

export { signupAdmin };
