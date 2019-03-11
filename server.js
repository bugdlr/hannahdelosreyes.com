"use strict";

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mailgun = require("mailgun-js");

const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const api_key = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
})


// POST route from contact form
app.post('/send-email', function (req, res) {
  let data;
  data = {
    from: "sender@example.com",
    to: "htdelosreyes8@gmail.com",
    subject: 'New message from contact form at hannahdelosreyes.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
    mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
          res.sendFile(path.join(__dirname, '/', 'index.html'));
        }
  });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
})
