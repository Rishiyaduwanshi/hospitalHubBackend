import Hospital from '../models/hospital.model.js';
import { AppError } from '../helpers/appError.js';
import sendResponse from '../helpers/appResponse.js';

export const createHospital = async (req, res, next) => {
  try {
    const { name, city, state, address, speciality} = req.body;

    if (!name || !city || !state || !address || !speciality) {
      throw new AppError({
        message: 'Please provide all required fields: name, city, state, address, and speciality',
        statusCode: 400,
      });
    }

    if (!req.files || req.files.length === 0) {
      throw new AppError({
        message: 'Please upload at least one image',
        statusCode: 400,
      });
    }

    const imageUrls = req.files.map(image => 
      `${req.protocol}://${req.get('host')}/uploads/${image.filename}`
    );

    const hospital = new Hospital({
      name,
      city,
      state,
      address,
      images : imageUrls,
      speciality,
    });

    const savedHospital = await hospital.save();

    sendResponse(res, {
      statusCode: 201,
      message: 'Hospital created successfully',
      data: {
        name : savedHospital.name,
        id : savedHospital._id,
        images : savedHospital.images,
      }
    });
  } catch (error) {
    next(error);
  }
};
