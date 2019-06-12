import models from '../../database/models';

const { Technology } = models;

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

export default addTechnology;
