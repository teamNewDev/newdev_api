import express from 'express';
import { default as createUser } from '../controllers';

const router = express.Router();

router.route('/auth/signup').post(createUser);

export default router;
