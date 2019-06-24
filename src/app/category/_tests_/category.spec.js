import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category } = models;

let adminUser, adminToken, createUser;

const baseUrl = '/api/v1/categories';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

const categoryRequestObject = {
  name: 'flask',
};

describe('Category Test Suite', () => {
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

  const addCategory = async (requestObject, token) =>
    chai
      .request(server)
      .post(baseUrl)
      .set('Authorization', token)
      .send(requestObject);

  describe('Admin input validation', () => {
    it('should not add a new category if user is not an admin', async () => {
      const requestObject = {
        ...userRequestObject,
        username: 'gimly',
        email: 'gimly@newdev.tech',
        role: 'user',
      };
      const user = await createUser(requestObject);
      const response = await addCategory(requestObject, user.body.token);
      const errorMessage = 'You must have role: [admin] to access this route';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(401);
    });

    it('admin should not be able to add category without the name field', async () => {
      const requestObject = {
        ...categoryRequestObject,
        name: undefined,
      };
      const response = await addCategory(requestObject, adminToken);
      const errorMessage = 'name is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('admin should not be able to add category with a non-string name field ', async () => {
      const requestObject = {
        ...categoryRequestObject,
        name: 88888888,
      };
      const response = await addCategory(requestObject, adminToken);
      const errorMessage = 'name should not be a non-string value';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });
  });

  describe('Get Category', () => {
    it('should get all categories', async () => {
      const response = await chai.request(server).get(baseUrl);
      expect(response.body).haveOwnProperty('categories');
      // eslint-disable-next-line no-unused-expressions
      expect(Array.isArray(response.body.categories)).to.be.true;
      expect(response.status).to.equal(200);
    });

    it('should get a single category', async () => {
      const requestObject = {
        ...categoryRequestObject,
        name: 'Beginner',
      };
      const category = await addCategory(requestObject, adminToken);
      const { name } = category.body.category;
      const response = await chai.request(server).get(`${baseUrl}/${name}`);
      expect(response.body.category.name).to.equal(name);
      expect(response.status).to.equal(200);
    });
  });
});
