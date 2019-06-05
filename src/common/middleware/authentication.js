import jwt from 'jsonwebtoken';
import models from '../../database/models';

const { User } = models;

const secret = process.env.SECRET_KEY;

const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, secret, async (err, decoded) => {
    let error;
    if (!token) {
      error = new Error('No token provided');
      error.status = 401;
      return next(error);
    }
    if (err) {
      error = new Error('Invalid token');
      error.status = 401;
      return next(error);
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      error = new Error('Invalid token');
      error.status = 401;
      return next(error);
    }
    req.decoded = decoded;
    return next();
  });
};

export default isTokenValid;
