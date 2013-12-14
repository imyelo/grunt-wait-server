/*
 * grunt-wait-server
 * https://github.com/imyelo/grunt-wait-server
 *
 * Copyright (c) 2013 yelo
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

module.exports = function(grunt) {

  grunt.registerMultiTask('wait_server', 'wait for server start', function() {
    var options = this.options({
      url: '',
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false
    });
    var done = this.async();
    var flag = {
      trigger: false
    };
    var doneTrigger = function () {
      if (!flag.trigger) {
        flag.trigger = true;
        done();
      }
    };
    var wait = function (done) {
      var doRequest = function () {
        console.log('waiting for the server ...');
        request(options.url, function (err, resp, body) {
          if (!err) {
            console.log('server is ready.');
            done();
          } else {
            doRequest();
          }
        });
      };
      doRequest();
    };
    grunt.log.writeln('waiting for server start');
    wait(doneTrigger);
    setTimeout(function () {
      if (!flag.trigger) {
        flag.trigger = true;
        grunt.log.warn('timeout.');
        options.fail();
        done(options.isforce);
      }
    }, options.timeout);
  });

};
