import { generateToken } from '../../common';
import models from '../../database/models';
// eslint-disable-next-line max-len
import EmailNotification from '../../common/notification/email/EmailNotification';
// eslint-disable-next-line max-len
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
  const { email, username, password, firstName, lastName, role } = req.body;

  const user = await User.create({
    username: username.toLowerCase(),
    password,
    firstName,
    lastName,
    email: email.toLowerCase(),
    role,
  });

  const token = generateToken(createTokenPayload(user));
  EmailNotification.sendToOne(
    accountVerificationTemplate(NEWDEV_EMAIL, email, token),
  );

  return res.status(201).json({
    message: 'Registration Successful!',
    user: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
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
    token,
  });
};

export { createUser, login };
