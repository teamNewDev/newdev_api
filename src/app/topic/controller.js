import models from '../../database/models';

const { Topic } = models;

const createTopic = async (req, res) => {
  const { name, technology } = req.body;
  const topic = await Topic.create({
    name: name.toLowerCase().trim(),
    technology: technology.toLowerCase().trim(),
  });
  return res.status(201).json({
    message: 'Sucessfully added Topic!',
    topic: {
      id: topic.id,
      name: topic.name,
      technology: topic.technology,
    },
  });
};

export default createTopic;
