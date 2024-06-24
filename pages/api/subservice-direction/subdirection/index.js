import connectDB from "../../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubServiceDirections(req, res);
      break;
    case "POST":
      await createSubserviceDirection(req, res);
    default:
      break;
  }
};

const getSubServiceDirections = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectSubServiceDirectionsQuery = `SELECT * FROM subservice_direction`;
    connection.query(selectSubServiceDirectionsQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const subServiceDirections = results;
      res.json({
        status: "success",
        result: subServiceDirections.length,
        subServiceDirections,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};


const createSubserviceDirection = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { dirtitle, dirarticle, dirimage, subserviceId } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createSubserviceDirectionQuery = `INSERT INTO subservice_direction (dirtitle, dirarticle, dirimage, subserviceId) VALUES (?, ?, ?, ?)`;
    const results = await connection.execute(createSubserviceDirectionQuery, [
      dirtitle,
      dirarticle,
      dirimage,
      subserviceId,
    ]);

    const subServiceDirection = results;
    res.json({
      status: "success",
      result: subServiceDirection ? subServiceDirection.length : 0,
      subServiceDirection,
      msg: "Услуга успешно добавлена",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
