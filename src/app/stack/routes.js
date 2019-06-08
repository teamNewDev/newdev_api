import express from 'express';
import { createStack, getStacks, getSingleStack } from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  doesStackExist,
} from './middleware';

const stackRoutes = express.Router();

stackRoutes
  .route('/')
  .post(
    isTokenValid,
    areRequiredParamsPresent,
    areTypesValid,
    isUserAdmin,
    isNameUnique,
    createStack,
  );

stackRoutes.route('/').get(getStacks);

stackRoutes.route('/:name').get(doesStackExist, getSingleStack);

export default stackRoutes;
