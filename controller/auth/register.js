import query from "../../db/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  // If no validation error, execute database query
  try {
    const body = req.body;
    const email = body.email;
    const username = body.username;
    const password = body.password;
    const isAdmin = body.isAdmin;

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const dbRes = await query(
      "INSERT INTO users (email, username, password, isAdmin) VALUES ($1, $2, $3, $4)",
      [email, username, hashedPassword, isAdmin]
    ).then(
      async () =>
        await query("SELECT * FROM users WHERE username=$1", [body.username])
    );

    const serverRes = {
      message: "A user created",
      data: dbRes.rows[0],
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default register;
