import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../database/models';
import server from '../../../index';

chai.use(chaiHttp);

const { Category, Technology, Topic, Subtopic } = models;

let adminUser, existingTopicId, existingSubtopicId;
const baseUrl = '/api/v1/proficiencies';
const userRequestObject = {
  username: 'buttercup',
  email: 'buttercup@puffmail.com',
  firstName: 'butter',
  password: 'superbuttercup',
  role: 'admin',
};

describe('Proficiency test suite', () => {
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
      index: '12.5',
    });
    const newTopic = await Topic.create({
      name: 'Control statements',
      technology: 'c#',
    });
    existingTopicId = newTopic.dataValues.id;
    const newSubtopic = await Subtopic.create({
      name: 'Declaring an arrays',
      topicId: existingTopicId,
    });
    existingSubtopicId = newSubtopic.dataValues.id;
  });

  describe('Proficiency Input Validations', () => {
    it('should not complete topic with nonexistent topicId', async () => {
      const requestObject = {
        topicId: 'nonexistent-id',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Topic with id: nonexistent-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not complete topic with missing topicId', async () => {
      const requestObject = {};
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'topicId is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not complete topic with an empty required field', async () => {
      const requestObject = {
        topicId: '',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'topicId must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not complete topic with a non-string topicId input', async () => {
      const requestObject = {
        topicId: [existingTopicId],
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[topicId] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    it('should not complete subtopic with nonexistent subtopicId', async () => {
      const requestObject = {
        subtopicId: 'nonexistent-id',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Subtopic with id: nonexistent-id does not exist';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(404);
    });

    it('should not complete subtopic with missing subtopicId', async () => {
      const requestObject = {};
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'subtopicId is required';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not complete subtopic with an empty required field', async () => {
      const requestObject = {
        subtopicId: '',
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'subtopicId must not be empty';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });

    // eslint-disable-next-line max-len
    it('should not complete subtopic with a non-string subtopicId input', async () => {
      const requestObject = {
        subtopicId: [existingSubtopicId],
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = '[subtopicId] must be of type: string';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(400);
    });
  });

  describe('Create Proficiency', async () => {
    let secondSubtopicId;
    before(async () => {
      const secondSubtopic = await Subtopic.create({
        name: 'Splicing an array',
        topicId: existingTopicId,
      });
      await Subtopic.create({
        name: 'Spliting an array',
        topicId: existingTopicId,
      });
      await Subtopic.create({
        name: 'Comparing arrays',
        topicId: existingTopicId,
      });
      secondSubtopicId = secondSubtopic.dataValues.id;
    });

    it('should successfully complete a subtopic', async () => {
      const requestObject = {
        subtopicId: existingSubtopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Subtopic marked as completed!');
      expect(response.body).to.haveOwnProperty('proficiency');
      expect(response.body.proficiency.topicId).to.equal(existingTopicId);
      expect(
        response.body.proficiency.subtopicIds.includes(existingSubtopicId),
      ).to.equal(true);
      expect(response.body.proficiency.proficiency).to.equal(100 / 4);
      expect(response.status).to.equal(201);
    });

    // eslint-disable-next-line max-len
    it('should successfully complete another subtopic of same topic', async () => {
      const requestObject = {
        subtopicId: secondSubtopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Subtopic marked as completed!');
      expect(response.body).to.haveOwnProperty('proficiency');
      expect(response.body.proficiency.topicId).to.equal(existingTopicId);
      expect(
        response.body.proficiency.subtopicIds.includes(existingSubtopicId),
      ).to.equal(true);
      // eslint-disable-next-line max-len
      expect(response.body.proficiency.proficiency).to.equal(100 / 4 + 100 / 4);
      expect(response.status).to.equal(201);
    });

    it('should not complete an already completed subtopic', async () => {
      const requestObject = {
        subtopicId: existingSubtopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/subtopic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Subtopic already completed by user';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });

    it('should successfully complete a topic', async () => {
      const requestObject = {
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      expect(response.body.message).to.equal('Topic marked as completed!');
      expect(response.body).to.haveOwnProperty('proficiency');
      expect(response.body.proficiency.topicId).to.equal(existingTopicId);
      expect(
        response.body.proficiency.subtopicIds.includes(existingSubtopicId),
      ).to.equal(true);
      expect(response.body.proficiency.proficiency).to.equal(100);
      expect(response.status).to.equal(201);
    });

    it('should not complete an already completed topic', async () => {
      const requestObject = {
        topicId: existingTopicId,
      };
      const response = await chai
        .request(server)
        .post(`${baseUrl}/topic`)
        .set('Authorization', adminUser.token)
        .send(requestObject);
      const errorMessage = 'Topic already completed by user';
      expect(response.body.error).to.equal(errorMessage);
      expect(response.status).to.equal(409);
    });
  });
});
