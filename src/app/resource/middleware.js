import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  uniqueParamValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const { resourceType, title, author } = req.body;
  const requiredParams =
    req.method === 'PATCH'
      ? [
          resourceType && 'resourceType',
          title && 'title',
          author && 'author',
        ].filter(Boolean)
      : ['topicId', 'url', 'resourceType', 'title', 'author'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { topicId, url, resourceType, title, author } = req.body;
  const stringParams = { topicId, url, resourceType, title, author };
  return typeValidator(stringParams, 'string', next);
};

const doesTopicExist = (req, res, next) => {
  const { method } = req;
  const { topicId } = method === 'GET' ? req.params : req.body;
  referencedParamValidator({ id: topicId }, 'Topic', next);
};

const doesResourceExist = (req, res, next) => {
  const { resourceId } = req.params;
  referencedParamValidator({ id: resourceId }, 'Resource', next);
};

const isUrlUnique = async (req, res, next) => {
  const { url } = req.body;
  uniqueParamValidator({ url }, 'Resource', next);
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  doesTopicExist,
  isUrlUnique,
  doesResourceExist,
};
