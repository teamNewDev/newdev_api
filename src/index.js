import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './app';
import { notFoundRoute, errorHandler } from './common/middleware';

dotenv.config();

const app = express();

app.enable('trust proxy');

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use('/api/v1/users', userRoutes);
app.use(notFoundRoute);
app.use(errorHandler);

export default app;
