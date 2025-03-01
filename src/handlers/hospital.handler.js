import Hospital from '../models/hospital.model.js';
import { AppError } from '../helpers/appError.js';
import sendResponse from '../helpers/appResponse.js';

export const createHospital = async (req, res, next) => {
  try {
    const { name, city, state, address, speciality } = req.body;

    if (!name || !city || !state || !address || !speciality) {
      throw new AppError({
        message:
          'Please provide all required fields: name, city, state, address, and speciality',
        statusCode: 400,
      });
    }

    if (!req.files || req.files.length === 0) {
      throw new AppError({
        message: 'Please upload at least one image',
        statusCode: 400,
      });
    }

    const imageUrls = req.files.map(
      (image) =>
        `${req.protocol}://${req.get('host')}/uploads/${image.filename}`
    );

    const hospital = new Hospital({
      name,
      city,
      state,
      address,
      images: imageUrls,
      speciality,
    });

    const savedHospital = await hospital.save();

    sendResponse(res, {
      statusCode: 201,
      message: 'Hospital created successfully',
      data: {
        name: savedHospital.name,
        id: savedHospital._id,
        images: savedHospital.images,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getHospitalsByFilter = async (req, res, next) => {
  try {
    const { city, state, speciality } = req.query;

    if (!city && !state && !speciality) {
      throw new AppError({
        message: "Please provide at least one filter: city, state, or speciality",
        statusCode: 400,
      });
    }

    const filter = {};

    if (city) filter.city = new RegExp(`^${city.trim()}$`, "i");
    if (state) filter.state = new RegExp(`^${state.trim()}$`, "i");
    if (speciality) filter.speciality = new RegExp(`^${speciality.trim()}$`, "i");

    const hospitals = await Hospital.find(filter);

    if (hospitals.length === 0) {
      throw new AppError({
        message: "No hospitals found with the provided filters",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Hospitals fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHospitals = async (_, res, next) => {
  try {
    const hospitals = await Hospital.find();

    if (!hospitals.length) {
      return next(new AppError({
        message: 'No hospitals found',
        statusCode: 404,
      }));
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'Hospitals fetched successfully',
      data: hospitals,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHospitalById = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw new AppError({
        message: 'Please provide hospital id',
        statusCode: 400,
      });
    }

    const hospital = await Hospital.findByIdAndDelete(id);

    if (!hospital) {
      throw new AppError({
        message: 'No hospital found with the provided id',
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      message: `${hospital.name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHospitalById = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw new AppError({
        message: 'Please provide hospital id',
        statusCode: 400,
      });
    }

    const hospital = await Hospital.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hospital) {
      throw new AppError({
        message: 'No hospital found with the provided id',
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'Hospital updated successfully',
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};


export const getHospitalById = async (req, res, next) => {
  try {
    const { id } = req.params; // URL se hospital ID le rahe hain

    if (!id) {
      throw new AppError({
        message: "Please provide hospital id",
        statusCode: 400,
      });
    }

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      throw new AppError({
        message: "No hospital found with the provided id",
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Hospital fetched successfully",
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};
