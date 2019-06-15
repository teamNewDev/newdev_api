import express from 'express';
import createTopic from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUniqueForTechnology,
  isTechnologyExisting,
} from './middleware';

const topicRoutes = express.Router();

topicRoutes
  .route('/')
  .post(
    isTokenValid,
    isUserAdmin,
    areTypesValid,
    areRequiredParamsPresent,
    isNameUniqueForTechnology,
    isTechnologyExisting,
    createTopic,
  );

export default topicRoutes;
