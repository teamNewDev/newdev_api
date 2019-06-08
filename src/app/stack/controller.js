import models from '../../database/models';

const { Stack, Language } = models;

const createStack = async (req, res) => {
  const { name } = req.body;
  const stack = await Stack.create({
    name: name.toLowerCase(),
  });

  return res.status(201).json({
    message: 'Stack created!',
    stack,
  });
};

const getStacks = async (req, res) => {
  const stacks = await Stack.findAndCountAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Language,
        attributes: ['id', 'name'],
      },
    ],
  });

  return res.status(201).json({
    stacks: stacks.rows,
    count: stacks.count,
  });
};

const getSingleStack = async (req, res) => {
  const { name } = req.params;
  const stack = await Stack.findOne({
    where: { name },
    include: [
      {
        model: Language,
        attributes: ['id', 'name'],
      },
    ],
  });

  return res.status(201).json({
    stack,
  });
};

export { createStack, getStacks, getSingleStack };
