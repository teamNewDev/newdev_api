import { expect } from 'chai';
import sinon from 'sinon';
import EmailNotification from '../email/EmailNotification';
// eslint-disable-next-line max-len
import accountVerificationTemplate from '../email/templates/accountVerificationTemplate';

const { NEWDEV_EMAIL } = process.env;

describe('Email Notification test', () => {
  it('should get stub transporter', () => {
    const spy = sinon.spy(EmailNotification, 'getTransporter');
    EmailNotification.getTransporter();
    expect(spy.called).equal(true);
  });
  it('should send mail to one', () => {
    const spy = sinon.spy(EmailNotification, 'sendToOne');
    EmailNotification.sendToOne(
      accountVerificationTemplate(NEWDEV_EMAIL, '@gmail.com', 'ddssdsdsd'),
    );
    expect(spy.called).equal(true);
  });
  it('should send multiple emails', () => {
    const spy = sinon.spy(EmailNotification, 'sendToMany');
    EmailNotification.sendToMany([
      accountVerificationTemplate(
        NEWDEV_EMAIL,
        'email1@gmail.com',
        'ddssdsdsd',
      ),
      accountVerificationTemplate(NEWDEV_EMAIL, 'email@gmail.com', 'ddssdsdsd'),
    ]);
    expect(spy.called).equal(true);
  });
});
