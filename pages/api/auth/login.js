import bcrypt from "bcrypt";
const mysql = require("mysql2");
import connectDB from "@/utils/connectDB";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";
import DatabaseConnection from "@/utils/DataBaseConnection";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = DatabaseConnection.getInstance().getConnection();
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await connection.promise().query(checkUserQuery, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ err: "This user does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: "Incorrect password." });
    }

    const access_token = createAccessToken({ id: user.id });
    const refresh_token = createRefreshToken({ id: user.id });

    connection.end();

    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
