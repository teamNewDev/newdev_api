import express from 'express';
import { default as createUser } from '../controllers';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
} from '../middleware';

const router = express.Router();

router
  .route('/auth/signup')
  .post(
    areRequiredParamsPresent,
    areTypesValid,
    isUsernameUnique,
    isEmailUnique,
    createUser,
  );

export default router;
