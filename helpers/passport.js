const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.client_ID,
  clientSecret: process.env.Client_Secret,
  callbackURL: "http://localhost:8080/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Handle user info, possibly saving to DB
  return done(null, profile);
}));

// Serialize and deserialize user (for session handling if needed)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
