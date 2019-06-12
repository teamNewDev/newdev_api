import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category } = models;
let adminUser;
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
    adminUser = (await chai
      .request(server)
      .post('/api/v1/users/auth/signup')
      .send(userRequestObject)).body;
    await Category.create({
      name: 'backend',
    });
  });

  describe('Input Params Validation', () => {
    it('should not add a technology with missing name field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        name: undefined,
      };
      const response = await chai
        .request(server)
        .post(baseUrl)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'name is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not add a technology with missing category field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        category: undefined,
      };
      const response = await chai
        .request(server)
        .post(baseUrl)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'category is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not add a technology with invalid category field', async () => {
      const requestObject = {
        ...technologyRequestObject,
        category: 'notepad',
      };
      const response = await chai
        .request(server)
        .post(baseUrl)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Category notepad does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });
  });

  describe('Add Technology', () => {
    it('should add a technology with valid params', async () => {
      const response = await chai
        .request(server)
        .post(baseUrl)
        .set('Authorization', adminUser.token)
        .send(technologyRequestObject);
      const successMessage = 'Sucessfully added Technology';
      expect(response.body.message).to.equal(successMessage);
      expect(response.status).to.equal(201);
    });

    it('should not add a technology with duplicate name', async () => {
      const response = await chai
        .request(server)
        .post(baseUrl)
        .set('Authorization', adminUser.token)
        .send(technologyRequestObject);
      const error = 'name already in use';
      expect(response.body.error).to.equal(error);
      expect(response.status).to.equal(409);
    });
  });
});
