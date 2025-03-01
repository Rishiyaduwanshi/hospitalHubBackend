import { Router } from 'express';
import { createHospital } from '../handlers/hospital.handler.js';
import upload from '../middlewares/storage.mid.js';

const router = Router();

router.post('/hospitals', upload.array('images', 5), createHospital);

export default router;
