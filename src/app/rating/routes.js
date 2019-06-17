import express from 'express';
import { isTokenValid } from '../../common';
import { createRating, getAverageRating } from './controller';
import {
  isRateValueNumber,
  isResourceIdString,
  doesResourceExist,
  isRatingUniqueForUser,
  areRequiredParamsPresent,
  isRateValueInRange,
} from './middleware';

const ratingRoutes = express.Router();

ratingRoutes
  .route('/')
  .post(
    isTokenValid,
    isResourceIdString,
    isRateValueNumber,
    areRequiredParamsPresent,
    isRateValueInRange,
    doesResourceExist,
    isRatingUniqueForUser,
    createRating,
  );

ratingRoutes.route('/:resourceId').get(doesResourceExist, getAverageRating);

export default ratingRoutes;
