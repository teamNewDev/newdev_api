import models from '../../database/models';
import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
} from '../../common';

const { Subtopic, Topic, Proficiency } = models;

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = req.path.includes('/topic')
    ? ['topicId']
    : ['subtopicId'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { topicId, subtopicId } = req.body;
  return typeValidator({ topicId, subtopicId }, 'string', next);
};

const doesTopicExist = (req, res, next) => {
  const { topicId } = req.body;
  referencedParamValidator({ id: topicId }, 'Topic', next);
};

const doesSubtopicExist = (req, res, next) => {
  const { subtopicId } = req.body;
  referencedParamValidator({ id: subtopicId }, 'Subtopic', next);
};

const isTopicCompleted = async (req, res, next) => {
  const {
    body: { topicId },
    decoded: { id: userId },
  } = req;
  const topic = await Topic.findOne({
    where: { id: topicId },
    include: [{ model: Subtopic }],
  });
  const subtopicIds = [];
  topic.Subtopics.map(subtopic => subtopicIds.push(subtopic.id));
  const proficiency = await Proficiency.findOne({
    where: { topicId, userId },
  });

  if (proficiency) {
    const completedSubtopicIds = proficiency.dataValues.subtopicIds;
    const differenceOfIds = subtopicIds.filter(
      id => !completedSubtopicIds.includes(id),
    );
    if (differenceOfIds.length < 1) {
      const error = new Error('Topic already completed by user');
      error.status = 409;
      return next(error);
    }
  }
  req.topic = topic;
  req.proficiency = proficiency;
  return next();
};
const isSubtopicCompleted = async (req, res, next) => {
  const {
    body: { subtopicId },
    decoded: { id: userId },
  } = req;
  const subtopic = await Subtopic.findOne({
    where: { id: subtopicId },
  });
  const { topicId } = subtopic.dataValues;
  const proficiency = await Proficiency.findOne({
    where: { topicId, userId },
  });
  if (proficiency) {
    const { subtopicIds } = proficiency.dataValues;
    if (subtopicIds.includes(subtopicId)) {
      const error = new Error('Subtopic already completed by user');
      error.status = 409;
      return next(error);
    }
  }
  req.proficiency = proficiency;
  req.topicId = topicId;
  req.subtopicId = subtopicId;
  return next();
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  doesTopicExist,
  isTopicCompleted,
  doesSubtopicExist,
  isSubtopicCompleted,
};
