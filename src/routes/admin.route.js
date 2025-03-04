import { Router } from 'express';
import {
  signinAdmin,
  signoutAdmin,
  signupAdmin,
  approveAdmin
} from '../handlers/admin.handler.js';
import { protectRoute } from '../middlewares/auth.mid.js';
import { getHospitalStats } from '../handlers/admin.handler.js';

const router = Router();

router.post('/signup', signupAdmin);

router.post('/signin', signinAdmin);

router.post('/signout', signoutAdmin);

router.get('/stats', protectRoute, getHospitalStats);

router.get('/approve/:email', approveAdmin);


export default router;
