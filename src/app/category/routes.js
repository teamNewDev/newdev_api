import express from 'express';
import { createCategory, getCategories, getSingleCategory } from './controller';
import { isUserAdmin, isTokenValid, getUserId } from '../../common';
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
    createCategory,
  );

categoryRoutes.route('/').get(getUserId, getCategories);
categoryRoutes.route('/:name').get(doesCategoryExist, getSingleCategory);

export default categoryRoutes;
