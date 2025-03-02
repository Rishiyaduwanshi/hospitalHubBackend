import { Router } from 'express';
import { signinAdmin, signoutAdmin, signupAdmin } from '../handlers/admin.handler.js';

const router = Router();

router.post('/signup', signupAdmin)

router.post('/signin', signinAdmin);

router.post('/signout', signoutAdmin);

export default router;
