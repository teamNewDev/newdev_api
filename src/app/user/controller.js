/* eslint-disable max-len */
import shortid from 'shortid';
import { generateToken } from '../../common';
import models from '../../database/models';
import EmailNotification from '../../common/notification/email/EmailNotification';
import accountVerificationTemplate from '../../common/notification/email/templates/accountVerificationTemplate';

const { User } = models;
const { NEWDEV_EMAIL } = process.env;
const createTokenPayload = user => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const createUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  let userObject = {
    username: username.toLowerCase(),
    password,
    email: email.toLowerCase(),
    verificationToken: shortid.generate(),
  };
  /* istanbul ignore next */
  userObject =
    process.env.NODE_ENV === 'test'
      ? { ...userObject, ...{ role } }
      : userObject;

  const user = await User.create(userObject);
  const token = generateToken(createTokenPayload(user));
  EmailNotification.sendToOne(
    accountVerificationTemplate(NEWDEV_EMAIL, email, token),
  );

  return res.status(201).json({
    message: 'Registration Successful!',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const login = async (req, res) => {
  const { user } = req;
  const token = generateToken(createTokenPayload(user));
  return res.status(201).json({
    message: 'Login Successful!',
    role: user.dataValues.role,
    token,
  });
};

const updateUserRole = async (req, res) => {
  const {
    user,
    body: { role },
  } = req;
  const updatedUser = await user.update({
    role,
  });

  return res.status(201).json({
    message: 'User role updated!',
    user: {
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
};

const updateUserDetails = async (req, res) => {
  const { id } = req.decoded;
  const { firstName, lastName } = req.body;
  const user = await User.findOne({
    where: { id },
  });

  const updatedUser = await user.update({
    firstName: (firstName && firstName.trim()) || user.dataValues.firstName,
    lastName: (lastName && lastName.trim()) || user.dataValues.lastName,
  });

  return res.status(201).json({
    message: 'User details updated!',
    user: {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    },
  });
};

export { createUser, login, updateUserRole, updateUserDetails };
