import express from 'express';
import { isUserAdmin, isTokenValid } from '../../common';
import {
  createSubtopic,
  getSubtopics,
  editSubtopic,
  deleteSubtopic,
} from './controller';
import {
  areTypesValid,
  areRequiredParamsPresent,
  doesTopicExist,
  isNameUniqueForTopic,
  doesSubtopicExist,
} from './middleware';

const subtopicRoutes = express.Router();

subtopicRoutes
  .route('/')
  .post(
    isTokenValid,
    isUserAdmin,
    areTypesValid,
    areRequiredParamsPresent,
    doesTopicExist,
    isNameUniqueForTopic,
    createSubtopic,
  );

subtopicRoutes.route('/:topicId').get(doesTopicExist, getSubtopics);

subtopicRoutes
  .route('/:subtopicId')
  .patch(
    isTokenValid,
    isUserAdmin,
    doesSubtopicExist,
    areTypesValid,
    areRequiredParamsPresent,
    isNameUniqueForTopic,
    editSubtopic,
  )
  .delete(isTokenValid, isUserAdmin, doesSubtopicExist, deleteSubtopic);

export default subtopicRoutes;
