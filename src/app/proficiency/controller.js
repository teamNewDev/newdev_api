import models from '../../database/models';

const { Proficiency, Subtopic } = models;

const completeTopic = async (req, res) => {
  const userId = req.decoded.id;
  const { topic } = req;
  let { proficiency } = req;
  const subtopicIds = [];
  topic.Subtopics.map(subtopic => subtopicIds.push(subtopic.id));
  proficiency = proficiency
    ? await proficiency.update({
        subtopicIds,
        proficiency: 100,
      })
    : await Proficiency.create({
        userId: userId.trim(),
        topicId: topic.dataValues.id,
        subtopicIds,
        proficiency: 100,
      });

  return res.status(201).json({
    message: 'Topic marked as completed!',
    proficiency,
  });
};

const completeSubtopic = async (req, res) => {
  const { topicId, subtopicId } = req;
  let { proficiency } = req;
  const userId = req.decoded.id;
  const AllSubtopics = await Subtopic.findAndCountAll({
    where: { topicId },
  });
  const numberOfSubtopics = AllSubtopics.count;
  const percentCompleted = 100 / numberOfSubtopics;

  if (proficiency) {
    const { subtopicIds } = proficiency.dataValues;
    const currentProficiency = proficiency.dataValues.proficiency;
    subtopicIds.push(subtopicId);
    await proficiency.update({
      subtopicIds: [...new Set(subtopicIds)],
      proficiency: currentProficiency + percentCompleted,
    });
  } else {
    proficiency = await Proficiency.create({
      userId: userId.trim(),
      topicId: topicId.trim(),
      subtopicIds: [subtopicId],
      proficiency: percentCompleted,
    });
  }

  return res.status(201).json({
    message: 'Subtopic marked as completed!',
    proficiency,
  });
};

export { completeTopic, completeSubtopic };
