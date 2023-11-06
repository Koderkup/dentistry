import bcrypt from "bcrypt";
const mysql = require("mysql2");
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import {
  createAccessToken
} from "../../../utils/generateToken";

connectDB();
export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Please login now!" });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const checkUserQuery = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await connection
      .promise()
      .query(checkUserQuery, [result.id]);
    const user = rows[0];

    if (!user) return res.status(400).json({ err: "User does not exist." });

    const access_token = createAccessToken({ id: user.id });

    connection.end();

    res.json({
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