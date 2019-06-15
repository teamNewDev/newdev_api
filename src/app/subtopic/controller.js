import Sequelize from 'sequelize';
import models from '../../database/models';

const { iLike } = Sequelize.Op;
const { Subtopic } = models;

const createSubtopic = async (req, res) => {
  const { name, topicId } = req.body;
  const subtopic = await Subtopic.create({
    name: name.toLowerCase().trim(),
    topicId: topicId.toLowerCase().trim(),
  });
  return res.status(201).json({
    message: 'Sucessfully added Subtopic!',
    subtopic,
  });
};

const getSubtopics = async (req, res) => {
  const { topicId } = req.params;
  const subtopics = await Subtopic.findAndCountAll({
    where: { topicId },
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({
    subtopics: subtopics.rows,
    count: subtopics.count,
  });
};

const editSubtopic = async (req, res) => {
  const {
    params: { subtopicId: id },
    body: { name },
  } = req;
  const subtopic = await Subtopic.findOne({
    where: {
      id: { [iLike]: id },
    },
  });
  await subtopic.update({ name: name.toLowerCase().trim() });
  return res.status(200).json({
    message: 'Name updated successfully!',
    subtopic,
  });
};

const deleteSubtopic = async (req, res) => {
  const { subtopicId: id } = req.params;
  const subtopic = await Subtopic.findOne({
    where: { id },
  });
  await subtopic.destroy();
  return res.status(200).json({
    message: 'Subtopic deleted successfully!',
  });
};

export { createSubtopic, getSubtopics, editSubtopic, deleteSubtopic };
