import { Router } from 'express';
import { signinAdmin, signupAdmin } from '../handlers/admin.handler.js';

const router = Router();

router.post('/signup', signupAdmin)

router.post('/signin', signinAdmin);

router.post('/logout', (req, res) => {
  res.send('Logout');
});

export default router;
