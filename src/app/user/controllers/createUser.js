import jwt from 'jsonwebtoken';
import models from '../../../database/models';

const { User } = models;
const secret = process.env.SECRET_KEY;
const time = { expiresIn: '4380hrs' };
const generateToken = payload => jwt.sign(payload, secret, time);

const createUser = async (req, res) => {
  const { username, password, firstName, lastName, email, role } = req.body;

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
  });

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = generateToken(tokenPayload);

  return res.status(201).json({
    message: 'Registration Successful!',
    user,
    token,
  });
};

export default createUser;
