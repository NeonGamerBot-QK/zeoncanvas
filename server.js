require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cookieparser = require('cookie-parser')
const passport = require('passport')
const app = express()
const fs = require('fs')
const path = require('path')
const srcFolder = path.join(__dirname, 'src', 'blocks')
const outFolder = path.join(__dirname, 'out')
const blocks = fs.readdirSync(srcFolder)
const { createCanvas, loadImage } = require('canvas')
const GitHubStrategy = require('passport-github').Strategy
if (process.env.SERVER_PORT) {
  console.log('hiptero')
  require('./make_canvas')
}
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//   profile.accessToken = accessToken;
//   profile.refreshToken = refreshToken;
//   cb(null, profile)
//   }
// ));
app.use(cookieparser())
app.use(session({
  // this should be changed to something cryptographically secure for production
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // automatically extends the session age on each request. useful if you want
  // the user's activity to extend their session. If you want an absolute session
  // expiration, set to false
  rolling: true,
  name: 'sid', // don't use the default session cookie name
  // set your options for the session cookie
  cookie: {
    httpOnly: true,
    // the duration in milliseconds that the cookie is valid
    maxAge: 20 * 60 * 1000 // 20 minutes
    // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
    // domain: 'your.domain.com',
    // recommended you use this setting in production if your site is published using HTTPS
    // secure: true,
  }
}))
// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });

//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });

  // initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
  // app.use(passport.initialize());
  // only required if using sessions. this will add middleware from passport
  // that will serialize/deserialize the user from the session cookie and add
  // them to req.user
//   app.use(passport.session());
// app.get('/auth/github',
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
app.get('/out/:id', (req, res) => {
  const id = req.params.id.replace('.png', '')
  console.log(id)
  if (!fs.existsSync(path.join(outFolder, `${id}.png`))) return res.status(404).send('Not found')
  res.sendFile(path.join(outFolder, `${id}.png`))
})
app.get('/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'edit.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/api/user', (req, res) => {
  res.json(req.user)
})
// app.get('/oauth', (req,res) => {
//     res.redirect(gapp.getWebFlowAuthorizationUrl({
//         // state: Math.random().toString(36).substr(2),
//         scopes: ["repo", "user", "repository_contents",
//         "public_repo", 'pull_requests:write', 'pull_requests:read'],
//       }).url)
// })
app.listen(process.env.PORT || process.env.SERVER_PORT || 3000)
