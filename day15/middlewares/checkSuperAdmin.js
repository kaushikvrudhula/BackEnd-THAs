exports.check = (req, res, next) => {
  if (req.session.User?.role === "superAdmin") {
    next();
  } else {
    res.status(401).send("Needs to be superAdmin");
  }
};
