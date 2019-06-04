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
    areRequiredParamsPresent,
    areTypesValid,
    isUsernameUnique,
    isEmailUnique,
    createUser,
  );

userRoutes
  .route('/auth/login')
  .post(areRequiredParamsPresent, areTypesValid, areCredentialsValid, login);

export default userRoutes;
