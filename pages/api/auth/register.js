import bcrypt from "bcrypt";
const mysql = require("mysql2");
import connectDB from "@/utils/connectDB";
import valid from "@/utils/valid";

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

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const checkTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) DEFAULT 'user',
      root BOOLEAN DEFAULT false,
      avatar VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dlr2olc8r/image/upload/v1699090090/test/user_default_x6y6up.png',
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await new Promise((resolve, reject) => {
      connection.query(checkTableQuery, (err) => {
        if (err) {
          reject(`Ошибка создания таблицы: ${err.message}`);
        } else {
          resolve();
        }
      });
    });

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