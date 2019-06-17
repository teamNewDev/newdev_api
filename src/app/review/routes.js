import express from 'express';
import { isTokenValid } from '../../common';
import { createReview, getReviews } from './controller';
import {
  areTypesValid,
  doesResourceExist,
  isReviewUniqueForUser,
  areRequiredParamsPresent,
} from './middleware';

const reviewRoutes = express.Router();

reviewRoutes
  .route('/')
  .post(
    isTokenValid,
    areTypesValid,
    areRequiredParamsPresent,
    doesResourceExist,
    isReviewUniqueForUser,
    createReview,
  );

reviewRoutes.route('/:resourceId').get(doesResourceExist, getReviews);

export default reviewRoutes;
