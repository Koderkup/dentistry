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
  createTables();
};

const createTables = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const checkUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      avatar JSON,
      role VARCHAR(255) DEFAULT 'user',
      root BOOLEAN DEFAULT false,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  connection.query(checkUserTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });
  const checkDoctorsTableQuery = `CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sirname VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  avatar JSON NOT NULL,
  proff VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  connection.query(checkDoctorsTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkServicesTableQuery = `CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  intro VARCHAR(255) NOT NULL,
  image JSON NOT NULL,
  description TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  connection.query(checkServicesTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkArticlesTableQuery = `CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  header VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image JSON NOT NULL,
  checked BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  connection.query(checkArticlesTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });
  const checkActionsTableQuery = `CREATE TABLE IF NOT EXISTS actions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  info TEXT NOT NULL,
  image JSON NOT NULL,
  checked BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  connection.query(checkActionsTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });
  const checkReviewsTableQuery = `CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  avatar JSON,
  rating INT NOT NULL,
  checked BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  connection.query(checkReviewsTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });
  connection.end();
};
export default connectDB;
