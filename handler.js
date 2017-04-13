'use strict';
var AWS = require('aws-sdk');

module.exports.slackEvent = (event, context, callback) => {

  var sqs = new AWS.SQS({region:'eu-west-1'});

  var jsonBody = JSON.parse(event.body)

  var sqsParams = {
    MessageBody: JSON.stringify(event.body),
    QueueUrl: process.env.QUEUE
  };

  sqs.sendMessage(sqsParams, function(err, data) {

    if (err) {
      callback(err);
    } else {
      const response = {
        statusCode: 200,
        body: jsonBody.challenge ? jsonBody.challenge : "OK"
      };
      callback(null, response);
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
