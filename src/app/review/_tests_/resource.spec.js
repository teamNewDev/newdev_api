import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category, Technology, Topic, Resource } = models;

let adminUser, existingTopicId, existingResourceId;
const baseUrl = '/api/v1/reviews';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Review test suite', () => {
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

  describe('Review Input Validations', () => {
    it('should not create review with nonexistent resource', async () => {
      const requestObject = {
        resourceId: 'nonexistent-id',
        review: `The video was a little bit too fast.
          The tutor assumed a lot about me`,
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

    it('should not create review with missing required field', async () => {
      const requestObject = {
        resourceId: existingResourceId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'review is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create review with an empty required field', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        review: '',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'review must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create review with a non-string resourceId input', async () => {
      const requestObject = {
        resourceId: [existingResourceId],
        review: `The video was a little bit too fast.
          The tutor assumed a lot about me`,
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
    it('should not create review with a non-string review input', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        review: [
          `The video was a little bit too fast.
          The tutor assumed a lot about me`,
        ],
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[review] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });
  });

  describe('Create Review', () => {
    it('should successfully create a review', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        review: `The video was too fast. The tutor assumed a lot about me`,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Sucessfully added Review!');
      expect(response.status).to.equal(201);
    });

    it('should not create review if user has already reviewed', async () => {
      const requestObject = {
        resourceId: existingResourceId,
        review: `The video was too fast. The tutor assumed a lot about me`,
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

  describe('Get Reviews', () => {
    it('should not get reviews if resourceId does not exist', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/nonexistent-resource-id`);
      const errorMessage =
        'Resource with id: nonexistent-resource-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully get reviews', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/${existingResourceId}`);
      expect(response.body).to.haveOwnProperty('reviews');
      expect(Array.isArray(response.body.reviews)).to.equal(true);
      expect(response.status).to.equal(200);
    });
  });
});
