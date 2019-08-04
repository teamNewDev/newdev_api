import Sequelize from 'sequelize';
import models from '../../database/models';

const { Technology, Topic, Proficiency } = models;
const { iLike } = Sequelize.Op;

const addTechnology = async (req, res) => {
  const { name, category, index } = req.body;

  const technology = await Technology.create({
    name: name.toLowerCase().trim(),
    category: category.toLowerCase().trim(),
    index,
  });

  return res.status(201).json({
    message: 'Sucessfully added Technology',
    technology: {
      id: technology.id,
      name: technology.name,
      category: technology.category,
      index: technology.index,
    },
  });
};

const getTechnologies = async (req, res) => {
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
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const technologies = await Technology.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [
      {
        model: Topic,
        include: [
          {
            model: Proficiency,
            where: { userId },
            attributes: ['proficiency'],
            required: false,
          },
        ],
      },
    ],
  });

  /* istanbul ignore next */
  technologies.rows.forEach(technology => {
    const proficiencyArray = [];
    technology.Topics.forEach(topic => {
      topic.dataValues.proficiency =
        (topic.dataValues.Proficiencies[0] || { dataValues: {} }).dataValues
          .proficiency || 0;
      delete topic.dataValues.Proficiencies;
      proficiencyArray.push(topic.dataValues.proficiency);
    });
    const sumOfProficiencies = proficiencyArray.reduce((a, b) => a + b, 0);
    const maximumProficiency = technology.Topics.length * 100;
    const averageProficiency = (sumOfProficiencies / maximumProficiency) * 100;
    technology.dataValues.proficiency = averageProficiency;
  });

  return res.status(200).json({
    technologies: technologies.rows,
    count: technologies.rows.count,
    totalCount: technologies.count,
    page,
  });
};

const getSingleTechnology = async (req, res) => {
  const { name } = req.params;
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
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const technology = await Technology.findOne({
    where: { name: { [iLike]: name } },
    include: [
      {
        model: Topic,
        limit,
        offset,
        include: [
          {
            model: Proficiency,
            where: { userId },
            attributes: ['proficiency'],
            required: false,
          },
        ],
      },
    ],
    distinct: true,
  });

  return res.status(200).json({
    technology,
  });
};

export { addTechnology, getTechnologies, getSingleTechnology };
