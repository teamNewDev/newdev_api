import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category, Technology, Topic, Resource } = models;

let adminUser,
  existingTopicId,
  existingResourceUrl,
  existingResourceId,
  existingResourceType,
  existingResourceTitle,
  existingResourceAuthor;
const baseUrl = '/api/v1/resources';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Resource test suite', () => {
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
      index: '5.1',
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
    existingResourceUrl = newResource.dataValues.url;
    existingResourceId = newResource.dataValues.id;
    existingResourceType = newResource.dataValues.resourceType;
    existingResourceTitle = newResource.dataValues.title;
    existingResourceAuthor = newResource.dataValues.author;
  });

  describe('Resource Input Validations', () => {
    it('should not create resource with nonexistent topic', async () => {
      const requestObject = {
        topicId: 'nonexistent-id',
        resourceType: 'Video',
        title: 'getting started with namespaces',
        author: 'Bugs Burney',
        url: 'http://newdev.tech',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Topic with id: nonexistent-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not create resource with missing required field', async () => {
      const requestObject = {
        topicId: existingTopicId,
        resourceType: 'Video',
        title: 'getting started with namespaces',
        author: 'Bugs Burney',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'url is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create resource with an empty required field', async () => {
      const requestObject = {
        topicId: existingTopicId,
        resourceType: 'Video',
        title: '',
        author: 'Bugs Burney',
        url: 'http://newdev.tech',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'title must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create a resource with a non-string title input', async () => {
      const requestObject = {
        topicId: existingTopicId,
        resourceType: 'Video',
        title: ['name', 'spaces'],
        author: 'Bugs Burney',
        url: 'http://newdev.tech',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[title] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create resource with a non-string topicId input', async () => {
      const requestObject = {
        topicId: ['topic', 'id'],
        resourceType: 'Video',
        title: 'Getting started with namespaces',
        author: 'Bugs Burney',
        url: 'http://newdev.tech',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[topicId] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create resource with already existing url', async () => {
      const requestObject = {
        topicId: existingTopicId,
        resourceType: 'Video',
        title: 'Getting started with namespaces',
        author: 'Bugs Burney',
        url: existingResourceUrl,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'url already in use';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });
  });

  describe('Create Resource', () => {
    it('should successfully create a resource', async () => {
      const requestObject = {
        topicId: existingTopicId,
        resourceType: 'Video',
        title: 'Getting started with namespaces',
        author: 'Bugs Burney',
        url: 'https://newdev.tech',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Sucessfully added Resource!');
      expect(response.status).to.equal(201);
    });
  });

  describe('Get Resources', () => {
    it('should not get resources if topic id does not exist', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/nonexistent-topic-id`);
      const errorMessage = 'Topic with id: nonexistent-topic-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully get resources', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/${existingTopicId}`);
      expect(response.body).to.haveOwnProperty('resources');
      expect(Array.isArray(response.body.resources)).to.equal(true);
      expect(response.status).to.equal(200);
    });
  });

  describe('Edit Resource', () => {
    it('should not edit a resource if id does not exist', async () => {
      const requestObject = {
        resourceType: 'Video',
        title: 'Scoping with namespaces',
        author: 'Bugs Burney',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/nonexistent-resource-id`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage =
        'Resource with id: nonexistent-resource-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully edit a resource with missing field', async () => {
      const requestObject = {};
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/${existingResourceId}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Resource updated successfully!');
      expect(response.body.resource.resourceType).to.equal(
        existingResourceType,
      );
      expect(response.body.resource.title).to.equal(existingResourceTitle);
      expect(response.body.resource.author).to.equal(existingResourceAuthor);
      expect(response.status).to.equal(200);
    });

    it('should successfully edit a resource with new values', async () => {
      const requestObject = {
        resourceType: 'Video',
        title: 'Scoping with namespaces',
        author: 'Bugs Burney',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/${existingResourceId}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Resource updated successfully!');
      expect(response.status).to.equal(200);
    });
  });

  describe('Delete Resource', () => {
    it('should not delete a resource if id does not exist', async () => {
      const response = await chai
        .request(server)
        .delete(`${baseUrl}/nonexistent-resource-id`)
        .set('Authorization', adminUser.token);
      const errorMessage =
        'Resource with id: nonexistent-resource-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully delete a resource', async () => {
      const response = await chai
        .request(server)
        .delete(`${baseUrl}/${existingResourceId}`)
        .set('Authorization', adminUser.token);
      expect(response.body.message).to.equal('Resource deleted successfully!');
      expect(response.status).to.equal(200);
    });
  });
});
