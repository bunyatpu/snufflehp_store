import * as functions from 'firebase-functions'
import Express from 'express'

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = Express()

app.get('*', function(req, res) {
  res.send("<h1>Hello firebase ES6</h1>");
});


export var snuff_app = functions.https.onRequest(app);

// app.listen(4003, (err) => {
//   if (err) throw err
//   console.log('> Ready on http://localhost:4003')
// })