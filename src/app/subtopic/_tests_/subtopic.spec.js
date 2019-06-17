import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category, Technology, Topic, Subtopic } = models;

let adminUser, existingTopicId, existingSubtopicName, existingSubtopicId;
const baseUrl = '/api/v1/subtopics';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Subtopic test suite', () => {
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
    const newSubtopic = await Subtopic.create({
      name: 'How to handle control statements',
      topicId: existingTopicId,
    });
    existingSubtopicName = newSubtopic.dataValues.name;
    existingSubtopicId = newSubtopic.dataValues.id;
  });

  describe('Subtopic Input Validations', () => {
    it('should not create subtopic with nonexistent topic', async () => {
      const requestObject = {
        name: 'How to handle namespaces',
        topicId: 'nonexistent-id',
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

    it('should not create subtopic without a name field', async () => {
      const requestObject = {
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'name is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create a subtopic without a topicId field', async () => {
      const requestObject = {
        name: 'How threading works',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'topicId is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create a subtopic with an empty name field', async () => {
      const requestObject = {
        name: '',
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'name must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with an empty topicId field', async () => {
      const requestObject = {
        name: 'How threading works',
        topicId: '',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'topicId must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not create a subtopic with a non-string name input', async () => {
      const requestObject = {
        name: 88888,
        topicId: 'html',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[name] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not create topic with a non-string topicId input', async () => {
      const requestObject = {
        name: 'New topic',
        topicId: 88888,
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

    it('should not create same subtopic with same topic', async () => {
      const requestObject = {
        name: existingSubtopicName,
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = `name: ${
        requestObject.name
      } already exists for topicId: ${requestObject.topicId}`;
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });
  });

  describe('Create Subtopic', () => {
    it('should successfully create a subtopic', async () => {
      const requestObject = {
        name: 'How to declare arrays',
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Sucessfully added Subtopic!');
      expect(response.status).to.equal(201);
    });
  });

  describe('Get Subtopics', () => {
    it('should not get subtopics if topic id does not exist', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/nonexistent-topic-id`);
      const errorMessage = 'Topic with id: nonexistent-topic-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully get subtopics', async () => {
      const response = await chai
        .request(server)
        .get(`${baseUrl}/${existingTopicId}`);
      expect(response.body).to.haveOwnProperty('subtopics');
      expect(Array.isArray(response.body.subtopics)).to.equal(true);
      expect(response.status).to.equal(200);
    });
  });

  describe('Edit Subtopic', () => {
    it('should not edit a subtopic if id does not exist', async () => {
      const requestObject = {
        name: 'Declaring arrays',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/nonexistent-subtopic-id`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage =
        'Subtopic with id: nonexistent-subtopic-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully edit a subtopic', async () => {
      const requestObject = {
        name: 'Declaring arrays',
      };
      const response = await chai
        .request(server)
        .patch(`${baseUrl}/${existingSubtopicId}`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Name updated successfully!');
      expect(response.status).to.equal(200);
    });
  });

  describe('Delete Subtopic', () => {
    it('should not delete a subtopic if id does not exist', async () => {
      const response = await chai
        .request(server)
        .delete(`${baseUrl}/nonexistent-subtopic-id`)
        .set('Authorization', adminUser.token);
      const errorMessage =
        'Subtopic with id: nonexistent-subtopic-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should successfully delete a subtopic', async () => {
      const response = await chai
        .request(server)
        .delete(`${baseUrl}/${existingSubtopicId}`)
        .set('Authorization', adminUser.token);
      expect(response.body.message).to.equal('Subtopic deleted successfully!');
      expect(response.status).to.equal(200);
    });
  });
});
