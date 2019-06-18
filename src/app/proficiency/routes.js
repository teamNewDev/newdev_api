import express from 'express';
import { isTokenValid } from '../../common';
import { completeTopic, completeSubtopic } from './controller';
import {
  areTypesValid,
  doesTopicExist,
  isTopicCompleted,
  doesSubtopicExist,
  isSubtopicCompleted,
  areRequiredParamsPresent,
} from './middleware';

const proficiencyRoutes = express.Router();

proficiencyRoutes
  .route('/topic')
  .post(
    isTokenValid,
    areTypesValid,
    areRequiredParamsPresent,
    doesTopicExist,
    isTopicCompleted,
    completeTopic,
  );

proficiencyRoutes
  .route('/subtopic')
  .post(
    isTokenValid,
    areTypesValid,
    areRequiredParamsPresent,
    doesSubtopicExist,
    isSubtopicCompleted,
    completeSubtopic,
  );

export default proficiencyRoutes;
