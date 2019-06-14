import express from 'express';
import createSubtopic from './controller';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  doesTopicExist,
  isNameUniqueForTopic,
} from './middleware';

const subtopicRoutes = express.Router();

subtopicRoutes
  .route('/')
  .post(
    isTokenValid,
    isUserAdmin,
    areRequiredParamsPresent,
    areTypesValid,
    doesTopicExist,
    isNameUniqueForTopic,
    createSubtopic,
  );

export default subtopicRoutes;
