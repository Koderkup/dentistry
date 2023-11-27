import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteReview(req, res);
      break;
    default:
      break;
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });
    const { id } = req.query;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();
    const deleteReviewQuery = `DELETE FROM reviews WHERE id = ?`;
    connection.query(deleteReviewQuery, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ msg: "Deleted Success!", status: "success" });
      connection.end();
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
