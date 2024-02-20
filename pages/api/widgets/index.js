import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getWidgets(req, res);
      break;
    case "POST":
      await createWidget(req, res);
    default:
      break;
  }
};

const getWidgets = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectWidgetsQuery = `SELECT * FROM widgets`;
    connection.query(selectWidgetsQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const widgets = results;
      res.json({
        status: "success",
        result: widgets.length,
        widgets,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createWidget = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { type, title, widgetURL } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createWidgetQuery = `INSERT INTO widgets (type, title, widgetURL) VALUES (?, ?, ?)`;
    const results = await connection.execute(createWidgetQuery, [
      type,
      title,
      widgetURL,
    ]);

    const widgets = results;
    res.json({
      status: "success",
      result: widgets ? widgets.length : 0,
      widgets,
      msg: "Виджет успешно добавлен",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
