import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category } = models;
let adminUser, adminToken, createUser;
const baseUrl = '/api/v1/technologies';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

const technologyRequestObject = {
  name: 'flask',
  category: 'backend',
};

describe('Technology Test Suite', () => {
  before(async () => {
    await models.sequelize.sync({ force: true });
    createUser = async requestObject =>
      chai
        .request(server)
        .post('/api/v1/users/auth/signup')
        .send(requestObject);
    adminUser = await createUser(userRequestObject);
    await Category.create({
      name: 'backend',
    });
    adminToken = adminUser.body.token;
  });

  const addTechnology = async (requestObject, token) =>
    chai
      .request(server)
      .post(baseUrl)
      .set('Authorization', token)
      .send(requestObject);

  describe('Authorization', () => {
    it('should not add a technology if user is not logged in', async () => {
      const requestObject = {
        ...technologyRequestObject,
        name: undefined,
      };
      const response = await addTechnology(requestObject, null);
      const errorMessage = 'Invalid token';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(401);
    });

    it('should not add a technology if user is not an admin', async () => {
      const requestObject = {
        ...userRequestObject,
        username: 'bubbles',
        email: 'bubbles@newdev.tech',
        role: 'user',
      };
      const user = await createUser(requestObject);
      const response = await addTechnology(requestObject, user.body.token);
      const errorMessage = 'You must have role: [admin] to access this route';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(401);
    });
  });

  describe('Input Params Validation', () => {
    it('should not add a technology with missing name field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        name: undefined,
      };
      const response = await addTechnology(requestObject, adminToken);
      const errorMessage = 'name is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not add a technology with missing category field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        category: undefined,
      };
      const response = await addTechnology(requestObject, adminToken);
      const errorMessage = 'category is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not add a technology with invalid category field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        category: 'notepad',
      };
      const response = await addTechnology(requestObject, adminToken);
      const errorMessage = 'Category notepad does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });
  });

  describe('Add Technology', () => {
    it('should add a technology with valid params', async () => {
      const response = await addTechnology(technologyRequestObject, adminToken);
      const successMessage = 'Sucessfully added Technology';
      expect(response.body.message).to.equal(successMessage);
      expect(response.status).to.equal(201);
    });

    it('should not add a technology with duplicate name', async () => {
      const response = await addTechnology(technologyRequestObject, adminToken);
      const error = 'name already in use';
      expect(response.body.error).to.equal(error);
      expect(response.status).to.equal(409);
    });
  });

  describe('Get Technology', () => {
    it('should get all technologies', async () => {
      const response = await chai.request(server).get(baseUrl);
      expect(response.body).haveOwnProperty('technologies');
      // eslint-disable-next-line no-unused-expressions
      expect(Array.isArray(response.body.technologies)).to.be.true;
      expect(response.status).to.equal(200);
    });

    it('should get a single technology', async () => {
      const requestObject = {
        ...technologyRequestObject,
        name: 'nodejs',
      };
      const technology = await addTechnology(requestObject, adminToken);
      const { name } = technology.body.technology;
      const response = await chai.request(server).get(`${baseUrl}/${name}`);
      expect(response.body.technology.name).to.equal(name);
      expect(response.status).to.equal(200);
    });
  });
});
