import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getReviews(req, res);
      break;
    case "POST":
      await createReview(req, res);
    case "DELETE":
      await deleteReviews(req, res);
    default:
      break;
  }
};

const getReviews = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectReviewsQuery = `SELECT * FROM reviews`;
    connection.query(selectReviewsQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const reviews = results;
      res.json({
        status: "success",
        result: reviews.length,
        reviews,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { name, comment, avatar, rating } = req.body;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();
    const createReviewQuery = `INSERT INTO reviews (name, comment, avatar, rating) VALUES (?, ?, ?, ?)`;
    await connection
      .promise()
      .query(createReviewQuery, [name, comment, avatar, rating]);
    connection.end();
    res.json({ msg: "Review created Success!", status: "success" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteReviews = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root) {
      return res.status(400).json({ err: "Authentication is not valid" });
    }
    const { ids } = req.body; 
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();

    const deleteReviewQuery = `DELETE FROM reviews WHERE id IN (?)`; 

    connection.query(deleteReviewQuery, [ids], (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ msg: "Удаление успешно!", status: "success" });
      connection.end();
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
