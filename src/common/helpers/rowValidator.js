import Sequelize from 'sequelize';
import models from '../../database/models';

const { iLike, or } = Sequelize.Op;

const notFoundRowValidator = async (req, model, next) => {
  const { id, name } = req.params;
  const row = await models[model].findOne({
    where: {
      [or]: [{ id: { [iLike]: id } }, { name: { [iLike]: name } }],
    },
  });
  if (!row) {
    const identifier = name ? `name ${name}` : `id ${id}`;
    const error = new Error(`${model} with ${identifier} does not exist`);
    error.status = 404;
    return next(error);
  }
  req[model.toLowerCase()] = row;
  return next();
};

export default notFoundRowValidator;
