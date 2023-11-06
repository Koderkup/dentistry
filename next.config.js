/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: "http://localhost:3000",
    MYSQLDB_URL: "http://localhost:3306",
    ACCESS_TOKEN_SECRET: "aGZY^&S@)z37;w8m%#Lj[45,6=.`(gb>Mud+]_rkscCQ?U/N~",
    REFRESH_TOKEN_SECRET: "pS~a,kU6.`$Bf:'LRCh[Y+)Kz!Fe%mH;8rqGx?@_#}d^9J->D2",
    CLOUD_UPDATE_PRESET: "YOUR_CLOUD_UPDATE_PRESET",
    CLOUD_API_KEY: "438173116697712",
    CLOUD_API_SECRET: "_Jmpfr149MPGuJj01yinyuH8DYA",
    CLOUD_NAME: "dlr2olc8r",
    EMAIL_SMPT: "mirastom2023@mail.ru",
    EMAIL_RECIEPIENT: "mirastom2023@gmail.ru",
    EMAIL_PASSWORD: "Dxf1VKdKgEVGzwcxAf2a",
    PORT: " 5000",
    DB_NAME: "mirastomDB",
    DB_USER: "root",
    DB_PASSWORD: "password",
    DB_HOST: "localhost",
    DB_PORT: "3306",
    SECRET_KEY: "random_secret_key123",
  },
};

module.exports = nextConfig;
