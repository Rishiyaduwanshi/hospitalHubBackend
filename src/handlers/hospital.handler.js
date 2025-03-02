import Hospital from '../models/hospital.model.js';
import { AppError } from '../helpers/appError.js';
import sendResponse from '../helpers/appResponse.js';
import { uploadToCloudinary } from '../helpers/uploadToCloudinary.js';

export const createHospital = async (req, res, next) => {
  try {
    const { name, city, address, speciality, ...other } = req.body;

    if (!name || !city || !address || !speciality || speciality.trim() === '') {
      throw new AppError({
        message: 'Name, city, address, and speciality are required fields',
        statusCode: 400,
      });
    }

    if (!req.files || req.files.length === 0) {
      throw new AppError({
        message: 'Please upload at least one image',
        statusCode: 400,
      });
    }

    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    let imageUrls;
    try {
      imageUrls = await Promise.all(
        req.files.map((image) => uploadToCloudinary(image.path, 'hospitalImages'))
      );
    } catch (uploadError) {
      console.error('Image upload error:', uploadError);
      // return next(new AppError({ message: 'Image upload failed', statusCode: 500 }));
    }

    const hospital = new Hospital({
      name,
      city,
      address,
      images: imageUrls,
      speciality: speciality
        .split(',')
        .map((item) => capitalizeFirstLetter(item.trim()))
        .filter((item) => item), 
      ...other,
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
    const { city, speciality } = req.query;

    if (!city && !speciality) {
      throw new AppError({
        message: 'Please provide at least one filter: city, or speciality',
        statusCode: 400,
      });
    }

    const filter = {};

    if (city) filter.city = new RegExp(`^${city.trim()}$`, 'i');
    if (speciality)
      filter.speciality = new RegExp(`^${speciality.trim()}$`, 'i');
    const hospitals = await Hospital.find(filter);

    if (hospitals.length === 0) {
      throw new AppError({
        message: 'No hospitals found with the provided filters',
        statusCode: 404,
      });
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

export const getAllHospitals = async (_, res, next) => {
  try {
    const hospitals = await Hospital.find();

    if (!hospitals.length) {
      return next(
        new AppError({
          message: 'No hospitals found',
          statusCode: 404,
        })
      );
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
    const { id } = req.params;

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
    const id = req.params.id;
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
        message: 'Please provide hospital id',
        statusCode: 400,
      });
    }

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      throw new AppError({
        message: 'No hospital found with the provided id',
        statusCode: 404,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'Hospital fetched successfully',
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};
