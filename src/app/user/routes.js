import express from 'express';
import { createUser, login, updateUserRole } from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areCredentialsValid,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
  doesUserExist,
  isRoleValid,
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

userRoutes
  .route('/role')
  .patch(
    isTokenValid,
    isUserAdmin,
    areTypesValid,
    areRequiredParamsPresent,
    doesUserExist,
    isRoleValid,
    updateUserRole,
  );

export default userRoutes;
