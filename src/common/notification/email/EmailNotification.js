import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Consola from 'consola';
import stubTransport from 'nodemailer-stub-transport';

dotenv.config();

const {
  NEWDEV_EMAIL,
  NEWDEV_EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_HOST,
  NODE_ENV,
} = process.env;

/** Email Notification Class */
class EmailNotification {
  /**
   *Sets email transport object
   * @static
   * @returns {Object} email
   * @memberof EmailNotification
   */
  static getTransporter() {
    if (NODE_ENV !== 'test') {
      /* istanbul ignore next */
      return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
          user: NEWDEV_EMAIL,
          pass: NEWDEV_EMAIL_PASS,
        },
      });
    }
    return nodemailer.createTransport(stubTransport());
  }

  /**
   * Sends email to one
   * @static
   * @param {Object} mailOptions
   * @returns {Object} emailReponse
   * @memberof EmailNotification
   */
  static async sendToOne(mailOptions) {
    const transporter = EmailNotification.getTransporter();
    try {
      const emailResponse = await transporter.sendMail(mailOptions);
      return emailResponse;
    } catch (error) {
      /* istanbul ignore next */
      Consola.log(error.message);
    }
  }

  /**
   * Sends email to many
   * @static
   * @param {Object} mailOptionsArray
   * @returns {Object} emailReponse
   * @memberof EmailNotification
   */
  static async sendToMany(mailOptionsArray) {
    const transporter = EmailNotification.getTransporter();
    try {
      mailOptionsArray.forEach(async emailOption => {
        await transporter.sendMail(emailOption);
      });
    } catch (error) {
      /* istanbul ignore next */
      Consola.log(error.message);
    }
  }
}

export default EmailNotification;
