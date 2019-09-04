import express from 'express';
import {
  createUser,
  login,
  verifyEmail,
  updateUserRole,
  updateUserDetails,
} from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  isVerificationTokenValid,
  areCredentialsValid,
  isUsernameUnique,
  areTypesValid,
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
  .route('/auth/verify')
  .post(areTypesValid, isVerificationTokenValid, verifyEmail);

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

userRoutes
  .route('/update')
  .patch(
    isTokenValid,
    areTypesValid,
    areRequiredParamsPresent,
    updateUserDetails,
  );

export default userRoutes;
