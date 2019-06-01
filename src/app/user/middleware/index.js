import { requiredParamsValidator, typeValidator } from '../../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['username', 'password', 'firstName', 'email'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { username, password, firstName, lastName, email, role } = req.body;
  const stringParams = { username, password, firstName, lastName, email, role };
  return typeValidator(stringParams, 'string', next);
};

export { areRequiredParamsPresent, areTypesValid };
