import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const baseUrl = '/api/v1/users';

let uniqueUser;
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
};

describe('User Test Suite', () => {
  before(async () => {
    await models.sequelize.sync({ force: true });
    const requestObject = {
      ...userRequestObject,
      ...{
        username: 'uniqueUser',
        email: 'unique@email.com',
      },
    };
    uniqueUser = (await chai
      .request(server)
      .post(`${baseUrl}/auth/signup`)
      .send(requestObject)).body.user;
  });

  describe('Input Validation', () => {
    it('should not signup a user with missing required field', async () => {
      const requestObject = {
        ...userRequestObject,
        ...{ username: undefined },
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'username is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not signup a user with empty param', async () => {
      const requestObject = { ...userRequestObject, ...{ username: '' } };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'username must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not signup a user with invalid email', async () => {
      const requestObject = { ...userRequestObject, ...{ email: 'invalid' } };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'Please enter a valid email';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not signup a user with invalid input type', async () => {
      const requestObject = { ...userRequestObject };
      requestObject.firstName = ['butter', 'cup'];
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = '[firstName] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not signup a user if password is less than 8', async () => {
      const requestObject = { ...userRequestObject, ...{ password: 'bugs' } };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'Your password must be at least 8 characters';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not signup a user if username is not unique', async () => {
      const requestObject = { ...userRequestObject };
      requestObject.username = uniqueUser.username;
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'username already in use';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });

    it('should not signup a user if email is not unique', async () => {
      const requestObject = { ...userRequestObject };
      requestObject.email = uniqueUser.email;
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = 'email already in use';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });

    it('should signup a user and return token if valid inputs', async () => {
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(userRequestObject);
      expect(response.body.message).to.equal('Registration Successful!');
      expect(response.body.token.length).to.be.greaterThan(0);
      expect(response.status).to.equal(201);
    });
  });

  describe('Login', () => {
    it('should not login a user with invalid credentials', async () => {
      const requestObject = {
        usernameOrEmail: uniqueUser.username,
        password: 'invalid-password',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/login`)
        .send(requestObject);
      const errorMessage = 'Invalid credentials';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(401);
    });

    it('should return token if credentials are valid', async () => {
      const requestObject = {
        usernameOrEmail: uniqueUser.username,
        password: userRequestObject.password,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/login`)
        .send(requestObject);
      expect(response.body.message).to.equal('Login Successful!');
      expect(response.body.token.length).to.be.greaterThan(0);
      expect(response.status).to.equal(201);
    });
  });
});
