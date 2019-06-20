/* eslint-disable no-restricted-syntax */
import Sequelize from 'sequelize';
import models from '../../database/models';
import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const { iLike } = Sequelize.Op;
const { Topic } = models;

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name', 'technology'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, technology } = req.body;
  if (Array.isArray(name)) return next();
  const stringParams = { name, technology };
  return typeValidator(stringParams, 'string', next);
};

const doesTechnologyExist = (req, res, next) => {
  referencedParamValidator(
    {
      name:
        req.method === 'GET'
          ? req.params.technology
          : req.body.technology.trim(),
    },
    'Technology',
    next,
  );
};

const isNameUniqueForTechnology = async (req, res, next) => {
  const { name, technology } = req.body;

  if (Array.isArray(name)) {
    let conflict = [];
    for (const value of name) {
      // eslint-disable-next-line no-await-in-loop
      const nameAlreadyExists = await Topic.findOne({
        where: { name: { [iLike]: value } },
      });
      if (nameAlreadyExists) conflict.push(value);
    }
    conflict = conflict.length > 1 ? [...new Set(conflict)] : conflict;
    const error = new Error(
      `name${conflict.length > 1 ? 's' : ''}: [${conflict.join(
        ', ',
      )}] already exists for technology: ${technology}`,
    );
    error.status = 409;
    return conflict.length > 0 ? next(error) : next();
  }
  relationalValidator(
    {
      name: name.trim(),
      technology: technology.trim(),
    },
    'Topic',
    next,
  );
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  doesTechnologyExist,
  isNameUniqueForTechnology,
};
