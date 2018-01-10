#!/usr/bin/env node
var redis = require('redis');
var prerender = require('./lib');

var LOG_REQUESTS = process.env.LOG_REQUESTS || false;
var REDIS_URL = process.env.REDIS_URL;

var server = prerender({
  logRequests: LOG_REQUESTS,
  chromeLocation: '/usr/bin/google-chrome-stable',
  chromeFlags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--no-sandbox'],
  cacheOptions: { // see https://github.com/kwhitley/apicache
    defaultDuration: '12 hours',
    redisClient: redis.createClient({
      url: REDIS_URL || 'redis://localhost:6379',
      statusCodes: {
        exclude: [500, 503, 504],
      },
    }),
  },
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
