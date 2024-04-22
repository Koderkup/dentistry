import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPrices(req, res);
      break;
    case "POST":
      await createPrice(req, res);
      break;
    case "DELETE":
      await deletePrices(req, res);
      break;
    default:
      break;
  }
};

const getPrices = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectPricesQuery = `SELECT prices.*, services.title as service FROM prices INNER JOIN services ON prices.serviceId = services.id`;
    connection.query(selectPricesQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const prices = results;
      res.json({
        status: "success",
        result: prices.length,
        prices,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createPrice = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { title, price, serviceId } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createPriceQuery = `INSERT INTO prices (title, price, serviceId) VALUES (?, ?, ?)`;
    const results = await connection.execute(createPriceQuery, [
      title,
      Number(price),
      Number(serviceId),
    ]);

    const prices = results;
    res.json({
      status: "success",
      result: prices ? prices.length : 0,
      prices,
      msg: "Цена на услугу успешно добавлена",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deletePrices = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root) {
      return res.status(400).json({ err: "Authentication is not valid" });
    }
    const { ids } = req.body; // Получаем массив идентификаторов цен из запроса
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();

    const deletePricesQuery = `DELETE FROM prices WHERE id IN (?)`; 

    connection.query(deletePricesQuery, [ids], (error, results) => {
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
