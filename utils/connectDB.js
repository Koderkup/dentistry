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
  comment TEXT NOT NULL,
  avatar VARCHAR(255),
  rating INT NOT NULL,
  checked BOOLEAN DEFAULT false,
  view BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  connection.query(checkReviewsTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkPriceTableQuery = `CREATE TABLE IF NOT EXISTS prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price INT(11) NOT NULL,
  serviceId INT(11) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
)`;
  connection.query(checkPriceTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkSubservicesTableQuery = `CREATE TABLE IF NOT EXISTS subservices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subtitle VARCHAR(255) NOT NULL,
  article TEXT NOT NULL,
  subimage JSON NOT NULL,
  serviceId INT(11) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
)`;
  connection.query(checkSubservicesTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkSubservicesDiractionTableQuery = `CREATE TABLE IF NOT EXISTS subservice_direction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dirtitle VARCHAR(255) NOT NULL,
  dirarticle TEXT NOT NULL,
  dirimage JSON NOT NULL,
  subserviceId INT(11) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subserviceId) REFERENCES subservices(id) ON DELETE CASCADE
)`;
  connection.query(checkSubservicesDiractionTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  const checkWidgetsQuery = `CREATE TABLE IF NOT EXISTS widgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  widgetURL VARCHAR(255) NOT NULL
   )`;
  connection.query(checkWidgetsQuery, (error, results) => {
    if (error) {
      throw error;
    }
  });

  connection.end();
};
export default connectDB;
