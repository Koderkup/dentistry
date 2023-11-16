import connectDB from "../../../utils/connectDB";
import DatabaseConnection from "@/utils/DataBaseConnection";
import auth from "../../../middleware/auth";
import mysql from 'mysql2'
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfo(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin") {
      return res.status(400).json({ err: "Authentication is not valid" });
    }
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();
    const selectUsersQuery = `SELECT * FROM users`;
   connection.query(selectUsersQuery, (error, results) => {
     if (error) {
       throw error;
     }
     const users = results;
     res.json(users);
    connection.end();
   });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const uploadInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;
    const connection = DatabaseConnection.getInstance().getConnection();
    await connection.execute(
      "UPDATE users SET name = ?, avatar = ? WHERE id = ?",
      [name, avatar, result.id]
    );

    res.json({
      msg: "Update Success!",
      user: {
        name,
        avatar,
        email: result.email,
        role: result.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    const connection = DatabaseConnection.getInstance().getConnection();
    connection.execute("DELETE FROM users WHERE id = ?", [result.id]);
    res.json({
      msg: "User`s delete is Success!",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
