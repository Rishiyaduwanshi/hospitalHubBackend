import { Router } from 'express';
import { createHospital, getHospitalsByFilter, deleteHospitalById, updateHospitalById } from '../handlers/hospital.handler.js';
import upload from '../middlewares/storage.mid.js';
const router = Router();

router.post('/hospitals', upload.array('images', 5), createHospital);

router.route('/hospitals/filter').get(getHospitalsByFilter).delete(deleteHospitalById);

router.route("/hospitals").patch(updateHospitalById);

export default router;
