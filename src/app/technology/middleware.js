import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  uniqueParamValidator,
  notFoundRowValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name', 'category', 'index'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, category, index } = req.body;
  const stringParams = { name, category, index };
  return typeValidator(stringParams, 'string', next);
};

const isIndexFloat = (req, res, next) => {
  const { index } = req.body;
  const floatRegex = /^[-+]?[0-9]+\.[0-9]+$/;
  if (index && index.match(floatRegex)) return next();

  const error = new Error('[index] must be of type: float');
  error.status = 400;
  return next(error);
};

const isNameUnique = (req, res, next) => {
  uniqueParamValidator({ name: req.body.name.trim() }, 'Technology', next);
};

const isIndexUnique = (req, res, next) => {
  uniqueParamValidator({ index: req.body.index }, 'Technology', next);
};

const isCategoryExisting = (req, res, next) => {
  referencedParamValidator(
    { name: req.body.category.trim() },
    'Category',
    next,
  );
};
const doesTechnologyExist = (req, res, next) => {
  notFoundRowValidator(req, 'Technology', next);
};
export {
  areRequiredParamsPresent,
  areTypesValid,
  isIndexFloat,
  isNameUnique,
  isIndexUnique,
  isCategoryExisting,
  doesTechnologyExist,
};
