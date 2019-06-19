/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import models from '../../database/models';

const { Topic } = models;

const topicCall = async (name, technology, topicResponse) => {
  const topic = await Topic.create({
    name: name.toLowerCase().trim(),
    technology: technology.toLowerCase().trim(),
  });
  topicResponse.push(topic.dataValues);
};

const createTopic = async (req, res) => {
  const { name, technology } = req.body;
  const topicResponse = [];

  if (!Array.isArray(name)) {
    await topicCall(name, technology, topicResponse);
  } else {
    const uniqueNameArray = [...new Set(name)];
    for (const value of uniqueNameArray) {
      await topicCall(value, technology, topicResponse);
    }
  }
  return res.status(201).json({
    message: `Sucessfully added Topic${topicResponse.length > 1 ? 's' : ''}!`,
    topic: topicResponse,
  });
};

export default createTopic;
