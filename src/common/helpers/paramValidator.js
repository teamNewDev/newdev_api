import models from '../../database/models';

const requiredParamsValidator = (body, requiredParams, next) => {
  const errorArray = [];
  requiredParams.forEach(param => {
    if (!Object.keys(body).includes(param)) {
      errorArray.push(`${param} is required`);
    }
    if (param.trim().length < 1) {
      errorArray.push(`${param} must not be empty`);
    }
  });

  if (!errorArray.length) return next();

  const error = new Error(errorArray.join(', '));
  error.status = 400;
  return next(error);
};

const typeValidator = (params, type, next) => {
  const invalidParams = [];

  for (const key of Object.keys(params)) {
    if (params[key] && typeof params[key] !== type) invalidParams.push(key);
  }

  if (!invalidParams.length) return next();

  const errorMessage = `[${invalidParams}] must be of type: ${type}`;
  const error = new Error(errorMessage.replace(',', ', '));
  error.status = 400;
  return next(error);
};

const uniqueParamValidator = async (param, model, next) => {
  const paramKey = Object.keys(param);
  const paramValue = String(Object.values(param)).toLowerCase();

  if (paramValue) {
    const paramExists = await models[model].findOne({
      where: { [paramKey]: paramValue },
    });
    if (paramExists) {
      const error = new Error(`${paramKey} already in use`);
      error.status = 409;
      return next(error);
    }
    return next();
  }

  return next();
};

export { requiredParamsValidator, typeValidator, uniqueParamValidator };
