import express from 'express';
import { isUserEditor, isTokenValid } from '../../common';
import {
  createResource,
  getResources,
  editResource,
  deleteResource,
} from './controller';
import {
  areTypesValid,
  areRequiredParamsPresent,
  doesTopicExist,
  isUrlUnique,
  doesResourceExist,
} from './middleware';

const resourceRoutes = express.Router();

resourceRoutes
  .route('/')
  .post(
    isTokenValid,
    isUserEditor,
    areTypesValid,
    areRequiredParamsPresent,
    doesTopicExist,
    isUrlUnique,
    createResource,
  );

resourceRoutes.route('/:topicId').get(doesTopicExist, getResources);

resourceRoutes
  .route('/:resourceId')
  .patch(
    isTokenValid,
    isUserEditor,
    doesResourceExist,
    areTypesValid,
    areRequiredParamsPresent,
    editResource,
  )
  .delete(isTokenValid, isUserEditor, doesResourceExist, deleteResource);

export default resourceRoutes;
