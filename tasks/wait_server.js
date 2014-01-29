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

  var waitServer = function() {
    var options = this.options({
      url: '',
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false,
      interval: 800,
      print: true
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
        if (options.print) {
          console.log('waiting for the server ...');
        }
        request(options.url, function (err, resp, body) {
          if (!err) {
            console.log('server is ready.');
            done();
          } else {
            setTimeout(doRequest, options.interval);
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
  };

  grunt.registerMultiTask('wait_server', 'wait for server start', waitServer);
  grunt.registerMultiTask('waitServer', 'wait for server start', waitServer);

};
