'use strict';

// Allow self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var grunt = require('grunt');
var http = require('http');
var https = require('https');

function get(url, done) {
  var client = http;
  if (url.toLowerCase().indexOf('https') === 0) {
    client = https;
  }
  client.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    }).on('end', function() {
      done(res, body);
    });
  });
}

exports.connect = {
  custom_base: function(test) {
    test.expect(2);
    get('http://localhost:8000/fixtures/hello.txt', function(res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'Hello world', 'should return static page');
      test.done();
    });
  },
  custom_port: function(test) {
    test.expect(2);
    get('http://localhost:9000/test/fixtures/hello.txt', function(res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'Hello world', 'should return static page');
      test.done();
    });
  },
  custom_https: function(test) {
    test.expect(2);
    get('https://localhost:8001/test/fixtures/hello.txt', function(res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'Hello world', 'should return static page');
      test.done();
    });
  },
  custom_https_certs: function(test) {
    test.expect(2);
    get('https://localhost:8002/test/fixtures/hello.txt', function(res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'Hello world', 'should return static page');
      test.done();
    });
  }


};
