import jwt from "jsonwebtoken";

const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    console.log(req.user);
    next();
  });
};

export default isAuthenticated;
