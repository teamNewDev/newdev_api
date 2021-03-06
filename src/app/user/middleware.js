import Sequelize from 'sequelize';
import models from '../../database/models';
import {
  requiredParamsValidator,
  typeValidator,
  uniqueParamValidator,
  userRoles,
} from '../../common';

const { User } = models;
const { iLike, or } = Sequelize.Op;

const areRequiredParamsPresent = (req, res, next) => {
  let requiredParams = req.path.includes('login')
    ? ['usernameOrEmail', 'password']
    : ['username', 'password', 'email'];
  requiredParams = req.path.includes('role')
    ? ['userId', 'role']
    : requiredParams;
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { usernameOrEmail, username, password } = req.body;
  const verificationToken = req.query.verificationToken || '';
  const { email, role } = req.body;
  const stringParams = {
    verificationToken,
    usernameOrEmail,
    username,
    password,
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

const isVerificationTokenValid = async (req, res, next) => {
  const verificationToken = req.body.verificationToken || '';
  const user = await User.findOne({ where: { verificationToken } });

  if (!user) {
    const error = new Error('Invalid token');
    error.status = 401;
    return next(error);
  }

  req.user = user;
  return next();
};

const doesUserExist = async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findOne({
    where: { id: userId },
  });
  if (!user) {
    const error = new Error(`User with id: ${userId} does not exist`);
    error.status = 404;
    return next(error);
  }
  req.user = user;
  return next();
};

const isRoleValid = async (req, res, next) => {
  const { role } = req.body;
  const roles = Object.values(userRoles);
  const validRoles = roles.filter(value => value !== 'super admin');
  if (!validRoles.includes(role)) {
    const error = new Error(`Role must be one of [${validRoles.join(', ')}]`);
    error.status = 400;
    return next(error);
  }
  return next();
};

export {
  areRequiredParamsPresent,
  areTypesValid,
  isUsernameUnique,
  isEmailUnique,
  areCredentialsValid,
  isVerificationTokenValid,
  doesUserExist,
  isRoleValid,
};
