import { Router } from 'express';
import { signinAdmin, signoutAdmin, signupAdmin } from '../handlers/admin.handler.js';
import { protectRoute } from '../middlewares/auth.mid.js';
import { getHospitalStats } from '../handlers/admin.handler.js';

const router = Router();

router.post('/signup', signupAdmin)

router.post('/signin', signinAdmin);

router.post('/signout', signoutAdmin);

router.get("/stats", protectRoute, getHospitalStats);

export default router;
