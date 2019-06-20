/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import models from '../../database/models';

const { Topic, Proficiency, Resource, Rating, Review, User } = models;

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

const getTopics = async (req, res) => {
  const { technology } = req.params;
<<<<<<< HEAD
  let offset,
    { page, limit = 100 } = req.query;
  page = Number(page);

  offset = limit * (page - 1);
  /* istanbul ignore next */
  if (!page || page < 1 || !Number(limit)) {
    offset = 0;
    page = 1;
    limit = 100;
  }
=======
>>>>>>> feat(topics): implement getTopics feature
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const topics = await Topic.findAndCountAll({
    order: [['createdAt', 'DESC']],
    where: { technology },
<<<<<<< HEAD
    limit,
    offset,
=======
>>>>>>> feat(topics): implement getTopics feature
    include: [
      {
        model: Proficiency,
        where: { userId },
        attributes: ['proficiency'],
        required: false,
      },
      {
        model: Resource,
        required: false,
        include: [
          {
            model: Rating,
            required: false,
            attributes: ['rating'],
          },
          {
            model: Review,
            required: false,
            attributes: ['review'],
            include: [
              {
                model: User,
                attributes: ['firstName'],
<<<<<<< HEAD
                required: false,
=======
>>>>>>> feat(topics): implement getTopics feature
              },
            ],
          },
        ],
      },
    ],
<<<<<<< HEAD
    distinct: true,
=======
>>>>>>> feat(topics): implement getTopics feature
  });

  return res.status(200).json({
    topics: topics.rows,
<<<<<<< HEAD
    count: topics.rows.length,
    totalCount: topics.count,
    page,
=======
    count: topics.count,
>>>>>>> feat(topics): implement getTopics feature
  });
};

export { createTopic, getTopics };
