import {
  requiredParamsValidator,
  typeValidator,
  uniqueParamValidator,
} from '../../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['username', 'password', 'firstName', 'email'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  const { email, role } = req.body;
  const stringParams = { username, password, firstName, lastName, email, role };
  return typeValidator(stringParams, 'string', next);
};

const isUsernameUnique = (req, res, next) => {
  const { username } = req.body;
  uniqueParamValidator({ username }, 'User', next);
};

const isEmailUnique = (req, res, next) => {
  uniqueParamValidator({ email: req.body.email }, 'User', next);
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
};
