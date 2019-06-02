import jwt from 'jsonwebtoken';
import models from '../../../database/models';

const { User } = models;
const secret = process.env.SECRET_KEY;
const time = { expiresIn: '4380hrs' };
const generateToken = payload => jwt.sign(payload, secret, time);

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

export default createUser;
