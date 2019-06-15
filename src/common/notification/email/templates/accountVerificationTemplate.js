import dotenv from 'dotenv';
import emailTemplate from './emailTemplate';

dotenv.config();

const { FRONTEND_BASE_PATH } = process.env;

const verifyAccount = (sender, receivers, token) => {
  const link = `${FRONTEND_BASE_PATH}/verify?token=${token}`;

  const emailObj = {
    from: sender, // sender address
    to: receivers, // list of receivers
    subject: 'NewDev Registration: Account Verification', // Subject line
    html: emailTemplate(
      'Account Verification',
      '',
      '',
      'Please Click the button below to verify your account',
      'Verify Account',
      link,
    ),
  };
  return emailObj;
};
export default verifyAccount;
