import connectDB from "../../../../utils/connectDB";
import auth from "../../../../middleware/auth";
const mysql = require("mysql2");
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubserviceDirection(req, res);
      break;
      case "PUT":
      await updateSubserviceDirection(req, res);
    default:
      break;
  }
};

const getSubserviceDirection = async (req, res) => {
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

    const selectSubserviceDirectionQuery = `SELECT * FROM subservice_direction WHERE id=?`;
    connection.query(
      selectSubserviceDirectionQuery,
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        const subServiceDirection = results;
        res.json({
          status: "success",
          result: subServiceDirection.length,
          subServiceDirection,
        });
      }
    );

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};


const updateSubserviceDirection = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { dirtitle, dirarticle, dirimage, subserviceId } = req.body;
    if (!dirtitle || !dirarticle || dirimage.length === 0 || !subserviceId)
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
    const updateSubServiceDirectionQuery =
      "UPDATE subservice_direction SET dirtitle=?, dirarticle=?, dirimage=?, subserviceId=? WHERE id=?";
    await connection.execute(updateSubServiceDirectionQuery, [
      dirtitle,
      dirarticle,
      dirimage,
      subserviceId,
      id,
    ]);
    res.json({ msg: "Данные успешно обновлены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};