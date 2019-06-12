import express from 'express';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  addTechnology,
  getTechnologies,
  getSingleTechnology,
} from './controller';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  isCategoryExisting,
  doesTechnologyExist,
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

technologyRoutes.route('/').get(getTechnologies);
technologyRoutes.route('/:name').get(doesTechnologyExist, getSingleTechnology);

export default technologyRoutes;
