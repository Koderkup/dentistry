import bcrypt from "bcrypt";
const mysql = require("mysql2");
import connectDB from "@/utils/connectDB";
import valid from "@/utils/valid";
import DatabaseConnection from "@/utils/DataBaseConnection";
connectDB();


export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};
const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;
  const connection = DatabaseConnection.getInstance().getConnection();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
    const [existingUser] = await connection
      .promise()
      .query(checkUserQuery, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ err: "This email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    await connection
      .promise()
      .query(insertUserQuery, [name, email, passwordHash]);

    connection.end();

    res.json({ msg: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};