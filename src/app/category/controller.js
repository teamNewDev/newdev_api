import models from '../../database/models';

const { Category, Technology, Topic, Proficiency, Subtopic, Resource } = models;

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name: name.toLowerCase().trim(),
  });

  return res.status(201).json({
    message: 'Category created!',
    category,
  });
};

const getCategories = async (req, res) => {
  /* istanbul ignore next */
  const userId = (req.decoded && req.decoded.id) || '';
  const categories = await Category.findAndCountAll({
    order: [['createdAt', 'DESC']],
    distinct: true,
    include: [
      {
        model: Technology,
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
              {
                model: Subtopic,
                required: false,
              },
              {
                model: Resource,
                required: false,
                include: [
                  {
                    model: Topic,
                    attributes: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  return res.status(200).json({
    categories: categories.rows,
    count: categories.count,
  });
};

const getSingleCategory = async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOne({
    where: { name },
    include: [
      {
        model: Technology,
      },
    ],
  });

  return res.status(200).json({
    category,
  });
};

export { createCategory, getCategories, getSingleCategory };
