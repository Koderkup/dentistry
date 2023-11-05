
const mysql = require("mysql2");

const connectDB = () => {
  // Создание соединения с базой данных
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Подключение к базе данных
  connection.connect((err) => {
    if (err) {
      console.error("Ошибка подключения к базе данных:", err.message);
      return;
    }
    // Создание базы данных, если она не существует
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
      (err) => {
        if (err) {
          console.error("Ошибка создания базы данных:", err.message);
          connection.end();
          return;
        }

        console.log("Соединение с базой данных успешно установлено");
        connection.end(); // Закрытие соединения после создания базы данных
      }
    );
  });
};

export default connectDB;