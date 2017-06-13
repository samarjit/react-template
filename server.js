"use strict";

var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');
var request = require('request');

// var backend = 'http://10.97.14.124/aris-core-ui/src';
// var backend = 'http://localhost:8080';
// var backend = 'http://localhost:9000';

var port = process.env.PORT || 9000;

var app = express();
var apiProxy = httpProxy.createProxyServer();


// app.all('/rest/*', function(req, res, next) {
//   apiProxy.web(req, res, {target: backend}, function(e) { console.warn("http-proxy exception:",e); });
//   // next();
// });



app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:'+port);
});
