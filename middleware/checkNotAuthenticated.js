function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).send("You're already authorized");
  }
  next();
}

module.exports = checkNotAuthenticated;