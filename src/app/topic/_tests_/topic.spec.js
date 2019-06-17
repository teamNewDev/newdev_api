import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category } = models;

let newTechnology;
let adminUser;
const baseUrl = '/api/v1';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Topic test suite', () => {
  before(async () => {
    await models.sequelize.sync({ force: true });
    adminUser = (await chai
      .request(server)
      .post('/api/v1/users/auth/signup')
      .send(userRequestObject)).body;
    await Category.create({
      name: 'backend',
    });

    const requestObject = {
      name: 'c#',
      category: 'backend',
    };
    newTechnology = (await chai
      .request(server)
      .post('/api/v1/technologies')
      .set('Authorization', adminUser.token)
      .send(requestObject)).body.technology;
  });

  describe('Add Topic', () => {
    it('should successfully create a topic', async () => {
      const requestObject = {
        name: 'Random topic',
        technology: 'c#',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Sucessfully added Topic!');
      expect(response.status).to.equal(201);
    });
  });

  describe('Topic Input Validations', () => {
    it('should not create topic with non-existing technology', async () => {
      const requestObject = {
        name: 'New html topic',
        technology: 'blockchain',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Technology with name: blockchain does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not create topic without a name field', async () => {
      const requestObject = {
        name: 'Threading',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'technology is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic without a name field', async () => {
      const requestObject = {
        technology: 'html',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'name is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with an empty name field', async () => {
      const requestObject = {
        name: '',
        technology: 'html',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'name must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with an empty technology field', async () => {
      const requestObject = {
        name: 'New topic',
        technology: '',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'technology must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with a non-string name input', async () => {
      const requestObject = {
        name: 88888,
        technology: 'html',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[name] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with a non-string technology', async () => {
      const requestObject = {
        name: 'New topic',
        technology: 88888,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[technology] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create same topic with the same technology', async () => {
      const requestObject = {
        name: 'Random topic',
        technology: newTechnology.name,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topics`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      // eslint-disable-next-line max-len
      const errorMessage = `name: ${
        requestObject.name
      } already exists for technology: ${newTechnology.name}`;
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });
  });
});
