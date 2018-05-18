'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snuff_app = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var app = (0, _express2.default)();

app.get('*', function (req, res) {
  res.send("<h1>Hello firebase ES6</h1>");
});

var snuff_app = exports.snuff_app = functions.https.onRequest(app);

// app.listen(4003, (err) => {
//   if (err) throw err
//   console.log('> Ready on http://localhost:4003')
// })