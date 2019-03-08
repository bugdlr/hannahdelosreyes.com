const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
})

// POST route from contact form
app.post('/', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 27017,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at hannahdelosreyes.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message} phone: ${req.body.phone}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log("Something went wrong with the contact form.");
    }
    else {
      console.log("Your message was successfully sent!");
    }
  });
});
