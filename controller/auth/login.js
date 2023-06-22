import query from "../../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const generateAccessToken = (userData) => {
  console.log(userData);
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: "1800s" });
};

const login = async (req, res) => {
  const body = req.body;

  try {
    const user = await query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [body.identifier]
    ).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    // decrypt the hash from db and compare
    bcrypt.compare(body.password, user.password, function (err, bcryptRes) {
      if (bcryptRes) {
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          isadmin: user.isadmin,
        });
        const serverRes = {
          message: "Login successful",
          data: user,
          jwt: token,
        };
        res.status(200).json(serverRes);
      } else {
        const serverRes = {
          message: "Login unsuccessful",
          data: "Invalid credential",
        };
        res.status(401).json(serverRes);
      }
    });
  } catch (error) {
    const serverRes = {
      message: "Invalid request",
      error: "Invalid identifier",
    };
    res.status(403).json(serverRes);
  }
};

export default login;
