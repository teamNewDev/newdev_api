import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('404 TEST SUITE', () => {
  it('should return 404 error', done => {
    chai
      .request(app)
      .get('/non-existent-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Route not found');
        done();
      });
  });
});
