import express from 'express';
import { createTopic, getTopics } from './controller';
import { isUserAdmin, isTokenValid, getUserId } from '../../common';
import {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUniqueForTechnology,
  doesTechnologyExist,
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
    doesTechnologyExist,
    createTopic,
  );

topicRoutes
  .route('/:technology')
  .get(getUserId, doesTechnologyExist, getTopics);

export default topicRoutes;
