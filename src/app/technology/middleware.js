import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  uniqueParamValidator,
  notFoundRowValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name', 'category'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, category } = req.body;
  const stringParams = { name, category };
  return typeValidator(stringParams, 'string', next);
};

const isNameUnique = (req, res, next) => {
  uniqueParamValidator({ name: req.body.name.trim() }, 'Technology', next);
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
  isNameUnique,
  isCategoryExisting,
  doesTechnologyExist,
};
