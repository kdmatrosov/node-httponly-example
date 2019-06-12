// require modules you need to setup the server :
const express = require('express');
// require module for cookies :
const cookieParser = require('cookie-parser');
// server port :
const port = process.env.PORT || 80;
// setup server :
const app = express();
// add cookieParser to express :
app.use(cookieParser('secret'));
// => (if you do not need to sign cookies, just use cookieParser with no arguments)
// make a basic route for tests
app.use(checkCookies);
app.get('/set', (req, res) => {
  res.cookie('HO', 'only for http', { httpOnly: true, maxAge: 1000000000, });
  res.cookie('JS', 'now you see me', { maxAge: 1000000000, });
  res.send('You set 2 cookies');
});
app.get('/get', (req, res) => {
  res.send(`Read ${Object.keys(req.cookies).length} cookies`);
});
// start server
app.listen(port);

function checkCookies(req, res, next) {
  for (const key in req.cookies) {
    console.log(req.cookies[key]);
  }
  next();
}
