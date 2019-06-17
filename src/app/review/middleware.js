import {
  requiredParamsValidator,
  typeValidator,
  referencedParamValidator,
  relationalValidator,
} from '../../common';

const areRequiredParamsPresent = (req, res, next) => {
  const requiredParams = ['resourceId', 'review'];
  return requiredParamsValidator(req.body, requiredParams, next);
};

const areTypesValid = (req, res, next) => {
  const { resourceId, review } = req.body;
  const stringParams = { resourceId, review };
  return typeValidator(stringParams, 'string', next);
};

const doesResourceExist = (req, res, next) => {
  const { resourceId } = req.method === 'GET' ? req.params : req.body;
  referencedParamValidator({ id: resourceId }, 'Resource', next);
};

const isReviewUniqueForUser = async (req, res, next) => {
  const {
    decoded: { id: userId },
    body: { resourceId },
  } = req;
  relationalValidator({ userId, resourceId }, 'Review', next);
};

export {
  areRequiredParamsPresent,
  isReviewUniqueForUser,
  doesResourceExist,
  areTypesValid,
};
