// function.js
const { https } = require("firebase-functions");
const { default: next } = require("next");
// import cors from 'cors';
// import express from 'express';
// const cors = require('cors');
// const express = require('express');

const isDev = process.env.NODE_ENV !== "production";

const server = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});

// exports.nextServer = https.onRequest((req, res) => {
//   return server.prepare().then(() => {

//     const expressServer = express();
//     // expressServer.use(cors({ origin: true }));
//     expressServer.use(cors());

//     expressServer.get('/hw', (req, res) => {
//       return server.render(req, res, 'hello world 123', req.query);
//     });

//     // server.get('/b', (req, res) => {
//     //   return nextApp.render(req, res, '/a', req.query);
//     // });

//     expressServer.get('*', (req, res) => {
//       return nextjsHandle(req, res);
//     });
//   });
// });

// exports.nextServer = https.onRequest((req, res) => {
//   return server.prepare().then(() => {
//     server.cors
//     // server.use(cors());
//     return nextjsHandle(req, res);
//   });
// });
