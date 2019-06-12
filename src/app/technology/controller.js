import Sequelize from 'sequelize';
import models from '../../database/models';

const { Technology, Topic } = models;
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
  const technologies = await Technology.findAndCountAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Topic,
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
  const technology = await Technology.findOne({
    where: { name: { [iLike]: name } },
    include: [
      {
        model: Topic,
      },
    ],
  });

  return res.status(200).json({
    technology,
  });
};

export { addTechnology, getTechnologies, getSingleTechnology };
