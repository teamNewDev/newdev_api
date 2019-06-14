import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['name', 'technology'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { name, technology } = req.body;
  const stringParams = { name, technology };
  return typeValidator(stringParams, 'string', next);
};

const isTechnologyExisting = (req, res, next) => {
  referencedParamValidator(
    { name: req.body.technology.trim() },
    'Technology',
    next,
  );
};

const isNameUniqueForTechnology = (req, res, next) => {
  const { name, technology } = req.body;
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
  isTechnologyExisting,
  isNameUniqueForTechnology,
};
