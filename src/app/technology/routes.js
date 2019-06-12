import express from 'express';
import addTechnology from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  isCategoryExisting,
} from './middleware';

const technologyRoutes = express.Router();

technologyRoutes
  .route('/')
  .post(
    isTokenValid,
    isUserAdmin,
    areRequiredParamsPresent,
    areTypesValid,
    isNameUnique,
    isCategoryExisting,
    addTechnology,
  );

export default technologyRoutes;
