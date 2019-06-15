import express from 'express';
import { createUser, login } from './controller';
import {
  areRequiredParamsPresent,
  areCredentialsValid,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
} from './middleware';

const userRoutes = express.Router();

userRoutes
  .route('/auth/signup')
  .post(
    areTypesValid,
    areRequiredParamsPresent,
    isUsernameUnique,
    isEmailUnique,
    createUser,
  );

userRoutes
  .route('/auth/login')
  .post(areTypesValid, areRequiredParamsPresent, areCredentialsValid, login);

export default userRoutes;
