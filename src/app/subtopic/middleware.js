import Sequelize from 'sequelize';
import models from '../../database/models';
import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const { iLike } = Sequelize.Op;
const { Subtopic } = models;

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams =
    req.method === 'PATCH' ? ['name'] : ['name', 'topicId'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, topicId } = req.body;
  const stringParams = { name, topicId };
  return typeValidator(stringParams, 'string', next);
};

const doesTopicExist = (req, res, next) => {
  const { method } = req;
  const { topicId } = method === 'GET' ? req.params : req.body;
  referencedParamValidator({ id: topicId }, 'Topic', next);
};

const doesSubtopicExist = (req, res, next) => {
  const { subtopicId } = req.params;
  referencedParamValidator({ id: subtopicId }, 'Subtopic', next);
};

const isNameUniqueForTopic = async (req, res, next) => {
  const { name } = req.body;
  const subtopic =
    req.params.subtopicId &&
    (await Subtopic.findOne({
      where: {
        id: { [iLike]: req.params.subtopicId },
      },
    }));
  const { topicId } = req.params.subtopicId ? subtopic.dataValues : req.body;
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
  doesSubtopicExist,
};
