import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDoctor(req, res);
      break;
    default:
      break;
  }
};

const getDoctor = async (req, res) => {
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

    const selectDoctorQuery = `SELECT * FROM doctors WHERE id = ?`;
    connection.query(selectDoctorQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const doctor = result;
      if(!doctor) return res.status(400).json({ err: 'Такого врача нет' });
      res.json({ doctor });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
