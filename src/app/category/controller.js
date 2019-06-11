import models from '../../database/models';

const { Category, Technology } = models;

const createcategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name: name.toLowerCase(),
  });

  return res.status(201).json({
    message: 'Category created!',
    category,
  });
};

const getcategories = async (req, res) => {
  const categories = await Category.findAndCountAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Technology,
      },
    ],
  });

  return res.status(201).json({
    categories: categories.rows,
    count: categories.count,
  });
};

const getSinglecategory = async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOne({
    where: { name },
    include: [
      {
        model: Technology,
      },
    ],
  });

  return res.status(201).json({
    category,
  });
};

export { createcategory, getcategories, getSinglecategory };
