import { Router } from 'express';
import { createHospital, getHospitalsByFilter, deleteHospitalById } from '../handlers/hospital.handler.js';
import upload from '../middlewares/storage.mid.js';
const router = Router();

router.post('/hospitals', upload.array('images', 5), createHospital);

router.route('/hospitals/filter').get(getHospitalsByFilter).delete(deleteHospitalById);

export default router;
