import Admin from '../models/admin.model.js';
import { AppError } from '../helpers/appError.js';
import { verifyToken } from '../helpers/jwt.js';

const isDev = process.env.MODE === "DEV";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.tala || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError({ 
        message: isDev ? 'Not authorized, token missing' : 'Unauthorized access', 
        statusCode: 401 
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      throw new AppError({ 
        message: isDev ? 'Token expired or invalid' : 'Unauthorized access', 
        statusCode: 401 
      });
    }

    if (decoded.ip !== req.ip || decoded.userAgent !== req.headers['user-agent']) {
      throw new AppError({ 
        message: isDev ? 'Token stolen or invalid!' : 'Unauthorized access', 
        statusCode: 401 
      });
    }

    req.admin = await Admin.findById(decoded.id).select('_id');
    if (!req.admin) {
      throw new AppError({ 
        message: isDev ? 'Admin not found' : 'Unauthorized access', 
        statusCode: 404 
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { protectRoute };
