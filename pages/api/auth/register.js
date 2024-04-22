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

const DEFAULT_IMG_URL = {
 public_id: "user_default_x6y6up",
 url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1699090090/test/user_default_x6y6up.png",
};
const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;
    console.log(name, email, password, cf_password);
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

    const insertUserQuery = `INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)`;
    await connection
      .promise()
      .query(insertUserQuery, [name, email, passwordHash, JSON.stringify(DEFAULT_IMG_URL)]);

    connection.end();

    res.json({ msg: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};