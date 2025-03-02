import express from "express";
import { protectRoute } from "../middlewares/auth.mid.js";
import sendResponse from "../helpers/appResponse.js";
import { AppError } from "../helpers/appError.js";

const router = express.Router();

router.get("/status", protectRoute, (req, res, next) => {
  try {
    if (!req.admin) {
      throw new AppError({ message: "Unauthorized access", statusCode: 401 });
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Admin authenticated successfully",
      data: { adminId: req.admin._id },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
