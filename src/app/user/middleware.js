import Sequelize from 'sequelize';
import models from '../../database/models';
import {
  requiredParamsValidator,
  typeValidator,
  uniqueParamValidator,
} from '../../common';

const { User } = models;
const { iLike, or } = Sequelize.Op;

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = req.path.includes('login')
    ? ['usernameOrEmail', 'password']
    : ['username', 'password', 'firstName', 'email'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { usernameOrEmail, username, password, firstName, lastName } = req.body;
  const { email, role } = req.body;
  const stringParams = {
    usernameOrEmail,
    username,
    password,
    firstName,
    lastName,
    email,
    role,
  };
  return typeValidator(stringParams, 'string', next);
};

const isUsernameUnique = (req, res, next) => {
  const { username } = req.body;
  uniqueParamValidator({ username }, 'User', next);
};

const isEmailUnique = (req, res, next) => {
  uniqueParamValidator({ email: req.body.email }, 'User', next);
};

const areCredentialsValid = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    where: {
      [or]: [
        { username: { [iLike]: usernameOrEmail } },
        { email: { [iLike]: usernameOrEmail } },
      ],
    },
  });
  const isPasswordValid =
    (user && (await user.validPassword(password))) || false;
  const error = new Error('Invalid credentials');
  error.status = 401;
  req.user = isPasswordValid ? user : null;
  return isPasswordValid ? next() : next(error);
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
  areCredentialsValid,
};