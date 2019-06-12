import models from '../../database/models';
import { userRoles } from '..';

const { User } = models;

const validateRole = async (req, userRole, next) => {
  const { id } = req.decoded;
  const error = new Error(
    `You must have role: [${userRole}] to access this route`,
  );
  error.status = 401;
  const validUser = await User.findOne({
    where: {
      id,
      role:
        userRole === userRoles.SUPER_ADMIN
          ? userRoles.SUPER_ADMIN
          : [userRoles.SUPER_ADMIN, userRoles.ADMIN, userRole],
    },
  });
  return validUser ? next() : next(error);
};

const isUserSuperAdmin = async (req, res, next) =>
  validateRole(req, userRoles.SUPER_ADMIN, next);

const isUserAdmin = async (req, res, next) =>
  validateRole(req, userRoles.ADMIN, next);

const isUserEditor = async (req, res, next) =>
  validateRole(req, userRoles.EDITOR, next);

const isUserExpert = async (req, res, next) =>
  validateRole(req, userRoles.EXPERT, next);

export { isUserSuperAdmin, isUserAdmin, isUserEditor, isUserExpert };
