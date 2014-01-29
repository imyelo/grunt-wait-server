# grunt-wait-server

> make grunt wait for server start

[![NPM version](https://badge.fury.io/js/grunt-wait-server.png)](http://badge.fury.io/js/grunt-wait-server)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wait-server --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wait-server');
```

## The "waitServer" task

### Overview
In your project's Gruntfile, add a section named `waitServer` or `wait-server` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  waitServer: {
    options: {
      url: 'http://localhost:8080',
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false,
      interval: 800,
      print: true
    },
    server: {
      options: {
        url: 'http://localhost:8080',
        fail: function () {},
        timeout: 10 * 1000,
        isforce: false,
        interval: 800,
        print: true
      },
    },
  },
});
```

### Options

#### options.url  
Type: `string`  
Default value: `''`  

this options is required.  


#### options.fail  
Type: `function`  
Default value: `function () {}`  


#### options.timeout  
Type: `number`  
Default value: `10 * 1000`  


#### options.isforce  
Type: `boolean`  
Default value: `false`  


#### options.interval  
Type: `number`  
Default value: `800`  


#### options.print  
Type: `boolean`  
Default value: `true` 


When `options.isforce` is true, 
the task will continue after `options.timeout`, 
even if the `done` signal in `options.wait` never came.  

### Usage Examples  

#### Default Options  
In this example, the `waitServer` task will wait for the server start with the least options.  

```js
var request = require('request');
grunt.initConfig({
  waitServer: {
    server: {
      options: {
        url: 'http://localhost:8080'
      }
    },
  },
});
```

#### Custom Options  

```js
var request = require('request');
grunt.initConfig({
  waitServer: {
    server: {
      options: {
        url: 'http://localhost:8080',
        fail: function () {
          console.error('the server had not start'); 
        },
        timeout: 20 * 1000,
        isforce: true,
        interval: 200,
        print: false
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/imyelo/grunt-wait-server/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

