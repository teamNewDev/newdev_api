import express from 'express';
import { default as createUser } from '../controllers';
import { areRequiredParamsPresent, areTypesValid } from '../middleware';

const router = express.Router();

router
  .route('/auth/signup')
  .post(areRequiredParamsPresent, areTypesValid, createUser);

export default router;
