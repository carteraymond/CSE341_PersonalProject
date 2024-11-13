function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(412).send({
        message: 'Authorization failed'
      });
  }
  
module.exports = ensureAuthenticated;