#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;


// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && S3_BUCKET_NAME) {
  server.use(prerender.s3HtmlCache());
}

server.start();
