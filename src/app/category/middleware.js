import {
  requiredParamsValidator,
  uniqueParamValidator,
  notFoundRowValidator,
  typeValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name } = req.body;
  const stringParam = { name };
  return typeValidator(stringParam, 'string', next);
};

const isNameUnique = (req, res, next) => {
  const { name } = req.body;
  uniqueParamValidator({ name }, 'Category', next);
};

const doescategoryExist = (req, res, next) => {
  notFoundRowValidator(req, 'Category', next);
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  isNameUnique,
  doescategoryExist,
};
