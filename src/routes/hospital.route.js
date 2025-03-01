import { Router } from "express";
import {
  createHospital,
  getHospitalsByFilter,
  deleteHospitalById,
  updateHospitalById,
  getAllHospitals,
  getHospitalById
} from "../handlers/hospital.handler.js";
import upload from "../middlewares/storage.mid.js";
import { protectRoute } from "../middlewares/auth.mid.js";

const router = Router();

router.route("/hospitals/filter").get(getHospitalsByFilter);


router.route("/hospitals/:id").delete(protectRoute, deleteHospitalById);

router
  .route("/hospitals")
  .get(getAllHospitals)
  .post(protectRoute, upload.array("images", 5), createHospital);


router
  .route("/hospitals/:id")
  .get(getHospitalById)
  .patch(protectRoute, updateHospitalById);

export default router;
