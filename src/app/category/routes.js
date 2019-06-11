import express from 'express';
import { createcategory, getcategories, getSinglecategory } from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  doescategoryExist,
} from './middleware';

const categoryRoutes = express.Router();

categoryRoutes
  .route('/')
  .post(
    isTokenValid,
    areRequiredParamsPresent,
    areTypesValid,
    isUserAdmin,
    isNameUnique,
    createcategory,
  );

categoryRoutes.route('/').get(getcategories);

categoryRoutes.route('/:name').get(doescategoryExist, getSinglecategory);

export default categoryRoutes;
