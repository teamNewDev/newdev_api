import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name', 'topicId'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, topicId } = req.body;
  const stringParams = { name, topicId };
  return typeValidator(stringParams, 'string', next);
};

const doesTopicExist = (req, res, next) => {
  referencedParamValidator({ id: req.body.topicId.trim() }, 'Topic', next);
};

const isNameUniqueForTopic = (req, res, next) => {
  const { name, topicId } = req.body;
  relationalValidator(
    {
      name: name.trim(),
      topicId: topicId.trim(),
    },
    'Subtopic',
    next,
  );
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  doesTopicExist,
  isNameUniqueForTopic,
};
