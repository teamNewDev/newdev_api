import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

let uniqueUser;
const baseUrl = '/api/v1/users';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  password: 'superbuttercup',
  role: 'admin',
};

describe('User Test Suite', () => {
  let adminToken;
  let verificationToken;
  before(async () => {
    await models.sequelize.sync({ force: true });
    const requestObject = {
      ...userRequestObject,
      ...{
        username: 'uniqueUser',
        email: 'unique@email.com',
      },
    };
    const newUser = (await chai
      .request(server)
      .post(`${baseUrl}/auth/signup`)
      .send(requestObject)).body;
    uniqueUser = newUser.user;
    adminToken = newUser.token;
    const dbUser = await models.User.findOne({
      where: { username: uniqueUser.username },
    });
    ({ verificationToken } = dbUser.dataValues);
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
      requestObject.username = ['butter', 'cup'];
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/signup`)
        .send(requestObject);
      const errorMessage = '[username] must be of type: string';
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

  describe('Email verification', () => {
    it('should not verify a user with invalid verification token', async () => {
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/verify`)
        .send({ verificationToken: '8898' });
      const errorMessage = 'Invalid token';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(401);
    });

    it('should verify user if verificationToken is valid', async () => {
      const response = await chai
        .request(server)
        .post(`${baseUrl}/auth/verify`)
        .send({ verificationToken });
      expect(response.body.message).to.equal('Email verified Successfully!');
      expect(response.body.active).to.equal(true);
      expect(response.status).to.equal(201);
    });
  });

  describe('Role', () => {
    it('should not update role if required param is not provided', async () => {
      const requestObject = {
        userId: uniqueUser.id,
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/role`)
        .set('Authorization', adminToken)
        .send(requestObject);
      const errorMessage = 'role is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not update role if user does not exist', async () => {
      const requestObject = {
        userId: 'nonexistent-id',
        role: 'admin',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/role`)
        .set('Authorization', adminToken)
        .send(requestObject);
      const errorMessage = 'User with id: nonexistent-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not update role if role input is invalid', async () => {
      const requestObject = {
        userId: uniqueUser.id,
        role: 'super admin',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/role`)
        .set('Authorization', adminToken)
        .send(requestObject);
      const errorMessage = 'Role must be one of';
      expect(response.body.error.includes(errorMessage)).to.equal(true);
      expect(response.status).to.equal(400);
    });

    it('should successfully update role with valid inputs', async () => {
      const requestObject = {
        userId: uniqueUser.id,
        role: 'expert',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/role`)
        .set('Authorization', adminToken)
        .send(requestObject);
      expect(response.body.message).to.equal('User role updated!');
      expect(response.body.user.role).to.equal(requestObject.role);
      expect(response.status).to.equal(201);
    });
  });
});
