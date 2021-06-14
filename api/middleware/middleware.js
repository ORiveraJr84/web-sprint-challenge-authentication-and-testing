const User = require("../auth/users-model.js");

async function checkBodyData(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({ message: "username and password required" });
  } else {
    next();
  }
}

async function checkUserNameExists(req, res, next) {
  try {
    const user = await User.getUserBy({ username: req.body.username });
    
    if (user.length > 0) {
      next();
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkUserNameFree(req, res, next) {
  try {
    const user = await User.getUserBy({ username: req.body.username });
    if (user.length > 0) {
      res.status(400).json({ message: "username taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkBodyData,
  checkUserNameExists,
  checkUserNameFree,
};
