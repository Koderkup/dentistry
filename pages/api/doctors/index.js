import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDoctors(req, res);
      break;
    case "POST":
      await createDoctor(req, res);
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
   const [results] = await connection.promise().query(selectDoctorsQuery);
     const doctors = results;
     res.json({
       status: "success",
       result: doctors.length,
       doctors,
     });


   connection.end();
  } catch (err) {
return res.status(500).json({err: err.message});
  }
};

const createDoctor = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { sirname, fullname, proff, avatar, description } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createDoctorQuery = `INSERT INTO doctors (sirname, fullname, proff, avatar, description) VALUES (?, ?, ?, ?, ?)`;
    const results = await connection.execute(createDoctorQuery, [
      sirname,
      fullname,
      proff,
      JSON.stringify(avatar),
      description,
    ]);

    const doctors = results;
    res.json({
      status: "success",
      result: doctors ? doctors.length : 0,
      doctors,
      msg: "Врач успешно добавлен",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};