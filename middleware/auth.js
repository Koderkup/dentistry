import jwt from "jsonwebtoken";
import connectDB from "../utils/connectDB";
import DatabaseConnection from "@/utils/DataBaseConnection";

connectDB();

const auth = async (req, res) => {
  const connection = DatabaseConnection.getInstance().getConnection();
  connection.connect();
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const checkUserQuery = `SELECT * FROM users WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(checkUserQuery, [decoded.id], (error, result) => {
      if (error) {
        reject(error);
      }
      const user = result[0];
      resolve({
        id: user.id,
        role: user.role,
        root: user.root,
        email: user.email,
      });
    });
  });
};
export default auth;
