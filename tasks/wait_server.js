/*
 * grunt-wait-server
 * https://github.com/imyelo/grunt-wait-server
 *
 * Copyright (c) 2013 yelo
 * Licensed under the MIT license.
 */

'use strict';

var net = require('net');
var request = require('request');

module.exports = function(grunt) {

  var waitServer = function() {
    var taskName = this.nameArgs;
    var options = this.options({
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false,
      interval: 800,
      print: true
    });

    if (!options.req && !options.net) {
      grunt.fail.fatal('The ' + taskName + ' task requires the req or net option' +
        '\nSee: https://github.com/imyelo/grunt-wait-server#options');
    }

    var trigger, client;
    var done = this.async();
    var doneTrigger = function (timeout) {
      if (!trigger) {
        trigger = true;
        if (timeout) {
          grunt.log.warn('timeout.');
          options.fail();
          return done(options.isforce);
        }
        grunt.log.ok(taskName + ' server is ready.');
        done();
      }
    };
    var wait = function (done) {
      var tryConnection = function () {
        if (options.print) {
          grunt.log.writeln(taskName + ' waiting for the server ...');
        }
        if (options.req) {
          // if options.req use request
          request(options.req, function (err, resp, body) {
            if (!err) {
              return done();
            }
            setTimeout(tryConnection, options.interval);
          });
        } else if (options.net) {
          // if options.net use net.connect
          client = net.connect(options.net, function() {
            client.destroy();
            done();
          });
          client.on('error', function() {
            client.destroy();
            setTimeout(tryConnection, options.interval);
          });
        }
      };

      tryConnection();
    };
    wait(doneTrigger);
    setTimeout(function () {
      doneTrigger(true);
    }, options.timeout);
  };

  grunt.registerMultiTask('wait_server', 'wait for server start', waitServer);
  grunt.registerMultiTask('waitServer', 'wait for server start', waitServer);

};
