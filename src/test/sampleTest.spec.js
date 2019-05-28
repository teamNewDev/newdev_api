import { expect } from 'chai';

describe('SAMPLE TEST SUITE', () => {
  it('Should return type of number', done => {
    const digit = 1;
    expect(typeof digit).to.equal('number');
    done();
  });
});
