import Sequelize from 'sequelize';
import models from '../../database/models';

const { Technology, Topic, Proficiency } = models;
const { iLike } = Sequelize.Op;

const addTechnology = async (req, res) => {
  const { name, category } = req.body;

  const technology = await Technology.create({
    name: name.toLowerCase().trim(),
    category: category.toLowerCase().trim(),
  });

  return res.status(201).json({
    message: 'Sucessfully added Technology',
    technology: {
      id: technology.id,
      name: technology.name,
      category: technology.category,
    },
  });
};

const getTechnologies = async (req, res) => {
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const technologies = await Technology.findAndCountAll({
    order: [['createdAt', 'DESC']],
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

  return res.status(200).json({
    technologies: technologies.rows,
    count: technologies.count,
  });
};

const getSingleTechnology = async (req, res) => {
  const { name } = req.params;
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const technology = await Technology.findOne({
    where: { name: { [iLike]: name } },
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

  return res.status(200).json({
    technology,
  });
};

export { addTechnology, getTechnologies, getSingleTechnology };
