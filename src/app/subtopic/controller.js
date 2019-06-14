import models from '../../database/models';

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

export default createSubtopic;
