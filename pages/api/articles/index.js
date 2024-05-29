import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getArticles(req, res);
      break;
    case "POST":
      await createArticle(req, res);
      break;
    default:
      break;
  }
};

const getArticles = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectArticlesQuery = `SELECT * FROM articles`;
    const [results] = await connection.promise().query(selectArticlesQuery);
    const articles = results;
    res.json({ articles });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { header, content, image } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createArticleQuery = `INSERT INTO articles (header, content, image) VALUES (?, ?, ?)`;
    const results = await connection.execute(createArticleQuery, [
      header,
      content,
      image,
    ]);
    const articles = results;
    res.json({
      status: "success",
      articles,
      msg: "Статья успешно добавлена",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
