const isAdmin = (req, res, next) => {
  if (req.user.isadmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAdmin;
