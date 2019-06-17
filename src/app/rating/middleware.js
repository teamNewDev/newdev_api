import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['resourceId', 'rating'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const isResourceIdString = (req, res, next) => {
  const { resourceId } = req.body;
  return typeValidator({ resourceId }, 'string', next);
};

const isRateValueNumber = (req, res, next) => {
  const { rating } = req.body;
  return typeValidator({ rating }, 'number', next);
};

const isRateValueInRange = (req, res, next) => {
  const { rating } = req.body;
  if (rating < 1 || rating > 10) {
    const error = new Error('Rate value must range from 1 to 10');
    error.status = 400;
    return next(error);
  }
  return next();
};

const doesResourceExist = (req, res, next) => {
  const { resourceId } = req.method === 'GET' ? req.params : req.body;
  referencedParamValidator({ id: resourceId }, 'Resource', next);
};

const isRatingUniqueForUser = async (req, res, next) => {
  const {
    decoded: { id: userId },
    body: { resourceId },
  } = req;
  relationalValidator({ userId, resourceId }, 'Rating', next);
};

export {
  areRequiredParamsPresent,
  isRatingUniqueForUser,
  doesResourceExist,
  isResourceIdString,
  isRateValueNumber,
  isRateValueInRange,
};
