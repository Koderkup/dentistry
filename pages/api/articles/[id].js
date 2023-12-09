import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getArticle(req, res);
      break;
    case "PUT":
      await updateArticle(req, res);
      break;
    default:
      break;
  }
};

const getArticle = async (req, res) => {
  try {
    const { id } = req.query;

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();

    const selectArticleQuery = `SELECT * FROM articles WHERE id = ?`;
    connection.query(selectArticleQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const article = result;
      if (!article) return res.status(400).json({ err: "Такой статьи нет" });
      res.json({ article });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { header, content, image } = req.body;
    if (!header || !content || image.length === 0)
      return res.status(500).json({ err: "Incomplete data" });
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect((err) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
    });
    const updateArticleQuery =
      "UPDATE articles SET header=?, content=?, image=? WHERE id=?";
    await connection.execute(updateArticleQuery, [header, content, image, id]);
    res.json({ msg: "Данные успешно обновлены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
