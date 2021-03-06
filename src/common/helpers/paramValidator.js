import Sequelize from 'sequelize';
import validator from 'validator';
import models from '../../database/models';

const { iLike } = Sequelize.Op;

const requiredParamsValidator = (body, requiredParams, next) => {
  const errorArray = [];
  requiredParams.forEach(param => {
    if (!Object.keys(body).includes(param)) {
      errorArray.push(`${param} is required`);
    }
    if (typeof body[param] === 'string') body[param] = body[param].trim();
    if (Object.keys(body).includes(param) && body[param].length < 1) {
      errorArray.push(`${param} must not be empty`);
    }
  });

  if (!errorArray.length) return next();

  const error = new Error(errorArray.join(', '));
  error.status = 400;
  return next(error);
};

const invalidEmailError = new Error('Please enter a valid email');
const invalidPasswordError = new Error(
  'Your password must be at least 8 characters',
);

const typeValidator = (params, type, next) => {
  const invalidParams = [];
  Object.keys(params).forEach(key => {
    if (type === 'number') params[key] = Number(params[key]) ? 1 : 'string';
    if (type === 'array' && params[key] && !Array.isArray(params[key])) {
      invalidParams.push(key);
    }
    // eslint-disable-next-line valid-typeof
    else if (params[key] && typeof params[key] !== type) {
      invalidParams.push(key);
    }
    if (
      key === 'email' &&
      typeof params[key] === 'string' &&
      !validator.isEmail(params[key])
    ) {
      invalidEmailError.status = 400;
      return next(invalidEmailError);
    }
    if (
      key === 'password' &&
      typeof params[key] === 'string' &&
      params[key].length < 8
    ) {
      invalidPasswordError.status = 400;
      return next(invalidPasswordError);
    }
  });

  if (!invalidParams.length) return next();
  const errorMessage = `[${invalidParams}] must be of type: ${type}`;
  const error = new Error(errorMessage.replace(',', ', '));
  error.status = 400;
  return next(error);
};

const uniqueParamValidator = async (param, model, next) => {
  const paramKey = Object.keys(param);
  const paramValue = String(Object.values(param)).toLowerCase();
  const paramExists = await models[model].findOne({
    where: { [paramKey]: paramValue },
  });

  if (paramExists) {
    const error = new Error(`${paramKey} already in use`);
    error.status = 409;
    return next(error);
  }

  return next();
};

const referencedParamValidator = async (param, model, next) => {
  const paramKey = Object.keys(param);
  const paramValue = String(Object.values(param)).toLowerCase();
  const paramExists = await models[model].findOne({
    where: { [paramKey]: paramValue.trim() },
  });

  if (!paramExists) {
    const error = new Error(
      `${model} with ${paramKey}: ${paramValue} does not exist`,
    );
    error.status = 404;
    return next(error);
  }
  return next();
};

const relationalValidator = async (params, model, next) => {
  const paramsKey = Object.keys(params);
  const paramsValue = Object.values(params);
  const rowExists = await models[model].findOne({
    where: {
      [paramsKey[0]]: { [iLike]: paramsValue[0] && paramsValue[0].trim() },
      [paramsKey[1]]: { [iLike]: paramsValue[1] && paramsValue[1].trim() },
    },
  });

  if (rowExists) {
    const error = new Error(
      `${paramsKey[0]}: ${paramsValue[0]} already exists for ${paramsKey[1]}: ${
        paramsValue[1]
      }`,
    );
    error.status = 409;
    return next(error);
  }
  return next();
};

export {
  requiredParamsValidator,
  typeValidator,
  uniqueParamValidator,
  referencedParamValidator,
  relationalValidator,
};
