import express from 'express';
import { createcategory, getcategories, getSingleCategory } from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  doesCategoryExist,
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
categoryRoutes.route('/:name').get(doesCategoryExist, getSingleCategory);

export default categoryRoutes;
