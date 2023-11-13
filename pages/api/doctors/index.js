import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");

connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDoctors(req, res);
      break;
    default:
      break;
  }
};

const getDoctors = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();
     
    const selectDoctorsQuery = `SELECT * FROM doctors`;
   connection.query(selectDoctorsQuery, (error, results) => {
     if (error) {
       throw error;
     }
     const doctors = results;
     res.json({
       status: "success",
       result: doctors.length,
       doctors,
     });
   });

   connection.end();
  } catch (err) {
return res.status(500).json({err: err.message});
  }
};
