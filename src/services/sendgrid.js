/* eslint-disable no-unused-vars */
const sgMail = require('@sendgrid/mail');

const { sendgridApiKey, host } = require('../../config');

const { generateJWT } = require('../utilities/helper');

sgMail.setApiKey(sendgridApiKey);

/**
   *
   * @param {*} messageData = {
      subject: <subject>,
      recieverEmail: <recieverEmail>,
      recieverName: <recieverName>,
      templateFileName: <templateFileName without extension>,
      variables: {<added information to add in email>},
      attachment:
    };
   * @return {*}
   */
module.exports = class Sendgrid {
  /**
   *
   * @param {*} msg = {
     to: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
   * @return {*}
   */
  static async sendVerificationEmail(email, name) {
    const msg = {
      to: email, // Change to your recipient
      subject: 'Verify your email',
      text: `Hi ${name}, your registeration was successfull.\n Kindly verify your email by clicking on the link bellow: \n
      ${host}/verify/${generateJWT({email})}
      `,
    }
    await this.sendEmail(msg);
    }
    /**
     * 
     *
     * @static
     * @param {*} msg={
     to: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
     */
    static async sendEmail(msg){
      const message = {
        ...msg,
        from: 'FlavourFusion401@gmail.com'
      }
      console.log('other called');

      sgMail
        .send(message)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      }
  

};
