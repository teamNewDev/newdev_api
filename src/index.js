import express from 'express';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  userRoutes,
  categoryRoutes,
  technologyRoutes,
  topicRoutes,
  subtopicRoutes,
  resourceRoutes,
  reviewRoutes,
  ratingRoutes,
  proficiencyRoutes,
} from './app';
import { notFoundRoute, errorHandler } from './common';
import { Api } from '../docs';

dotenv.config();

const app = express();

app.enable('trust proxy');

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

app.use(cors({ origin: process.env.FRONTEND_BASE_PATH }));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(Api));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/technologies', technologyRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/subtopics', subtopicRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/proficiencies', proficiencyRoutes);
app.use(notFoundRoute);
app.use(errorHandler);

export default app;
