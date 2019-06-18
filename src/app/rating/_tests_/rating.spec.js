import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category, Technology, Topic, Resource } = models;

let adminUser, existingTopicId, existingResourceId;
const baseUrl = '/api/v1/ratings';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Rating test suite', () => {
  before(async () => {
    await models.sequelize.sync({ force: true });
    adminUser = (await chai
      .request(server)
      .post('/api/v1/users/auth/signup')
      .send(userRequestObject)).body;
    await Category.create({
      name: 'backend',
    });
    await Technology.create({
      name: 'c#',
      category: 'backend',
    });
    const newTopic = await Topic.create({
      name: 'Control statements',
      technology: 'c#',
    });
    existingTopicId = newTopic.dataValues.id;
    const newResource = await Resource.create({
      topicId: existingTopicId,
      resourceType: 'video',
      title: 'Handling control statements in C#',
      author: 'Bugs Burney',
      url: 'https://randomurl.com/resource',
    });
    existingResourceId = newResource.dataValues.id;
  });

  describe('Rating Input Validations', () => {
    it('should not create rating with nonexistent resource', async () => {
      const requestObject = {
        resourceId: 'nonexistent-id',
        rating: 3,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Resource with id: nonexistent-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not create rating with missing required field', async () => {
      const requestObject = {
        rating: 5,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'resourceId is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create rating with an empty required field', async () => {
      const requestObject = {
        resourceId: '',
        rating: 5,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'resourceId must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create rating with a non-string resourceId input', async () => {
      const requestObject = {
        resourceId: [existingResourceId],
        rating: 4,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[resourceId] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create rating with a non-numeric rating input', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        rating: [5, 6],
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[rating] must be of type: number';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create rating if value is greater than 10', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        rating: 13,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Rate value must range from 1 to 10';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });
  });

  describe('Create Rating', () => {
    it('should successfully create a rating', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        rating: 3,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Sucessfully added Rating!');
      expect(response.status).to.equal(201);
    });

    it('should not create rating if user has already rated', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        rating: 3,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = `userId: ${
        adminUser.user.id
      } already exists for resourceId: ${requestObject.resourceId}`;
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });
  });

  describe('Get Ratings', () => {
    it('should not get ratings if resourceId does not exist', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/nonexistent-resource-id`);
      const errorMessage =
        'Resource with id: nonexistent-resource-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully get AverageRating', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/${existingResourceId}`);
      expect(response.body).to.haveOwnProperty('averageRating');
      expect(response.body.averageRating.averageRating).to.equal(3);
      expect(response.status).to.equal(200);
    });
  });
});
