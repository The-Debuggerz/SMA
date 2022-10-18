const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  service: process.env.SMTP_SERVICES || 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

const getTemplate = (filename, body) => {
  body.dDate = _.formattedDate();
  const emailTemplatePath = path.join(
    __dirname,
    './dir/email_templates',
    filename
  );
  const template = fs.readFileSync(emailTemplatePath, { encoding: 'utf-8' });
  return ejs.render(template, body);
};
const operations = {
  send: (body, callback) => {
    let filename = '';
    let subject = '';
    if (body.type === 'forgotPassword') {
      filename = 'forgot_password.html';
      subject = ' Reset Password';
    }
    if (body.type === 'registerUser') {
      filename = 'account_activation.html';
      subject = 'Account Activation';
    }
    const template = getTemplate(filename, body);
    operations.sendEmail(subject, body, callback, template);
  },

  sendEmail: (
    subject,
    body,
    callback,
    template = getTemplate('account_activations.html')
  ) => {
    transporter.sendMail(
      {
        from: process.env.SMTP_EMAIL,
        to: body.sEmail,
        subject,
        html: template,
      },
      (error, info) => {
        if (error) {
          console.log('sendEmail: ~ error', error);
          return callback(error);
        }
        callback();
      }
    );
  },
};

module.exports = operations;
