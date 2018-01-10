#!/usr/bin/env node
var redis = require('redis');
var prerender = require('./lib');

var REDIS_URL = process.env.REDIS_URL;

var server = prerender({
  // logRequests: true,
  // chromeLocation: '/usr/bin/google-chrome-stable',
  // chromeFlags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--no-sandbox'],
  cacheOptions: { // see https://github.com/kwhitley/apicache
    // debug: true,
    defaultDuration: '12 hours',
    redisClient: redis.createClient({
      // host: REDIS_HOST,
      // port: REDIS_PORT,
      url: REDIS_URL || 'redis://localhost:6379'
    }),
  },
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
