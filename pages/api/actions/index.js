const mysql = require('mysql2');
import connectDB from '../../../utils/connectDB';
import auth from '@/middleware/auth';
connectDB();

export default async function (req, res) {
    switch (req.method) {
      case "GET":
        await getActions(req, res);
        break;
      case "POST":
        await createAction(req, res);
        break;
      default:
        break;
    }
}
const getActions = async function (req, res) {
    try {
      const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      connection.connect();

      const selectActionsQuery = `SELECT * FROM actions`;
      connection.query(selectActionsQuery, (error, results) => {
        if (error) {
          throw error;
        }
        const actions = results;
        res.json({ actions });
      });

      connection.end();
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
};
const createAction = async function (req, res) {
    try {
      const admin = await auth(req, res);
      if (!admin || admin.role !== "admin") {
        return res.status(500).json({ err: "Authentication is not valid" });
      }
      const { title, info, image } = req.body;
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const createActionQuery = `INSERT INTO actions (title, info, image) VALUES (?, ?, ?)`;
      const results = await connection.execute(createActionQuery, [
        title,
        info,
        image,
      ]);
      const actions = results;
      res.json({
        status: "success",
        actions,
        msg: "Акция успешно добавлена",
      });

      connection.end();
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
};