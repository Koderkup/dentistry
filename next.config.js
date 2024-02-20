/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ["res.cloudinary.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
    ],
  },
  env: {
    BASE_URL: "http://localhost:3000/",
    MYSQLDB_URL: "db4free.net",
    ACCESS_TOKEN_SECRET: "aGZY^&S@)z37;w8m%#Lj[45,6=.`(gb>Mud+]_rkscCQ?U/N~",
    REFRESH_TOKEN_SECRET: "pS~a,kU6.`$Bf:'LRCh[Y+)Kz!Fe%mH;8rqGx?@_#}d^9J->D2",
    CLOUD_API: "https://api.cloudinary.com/v1_1/dlr2olc8r/image/upload",
    CLOUD_API_KEY: "438173116697712",
    CLOUD_API_SECRET: "_Jmpfr149MPGuJj01yinyuH8DYA",
    CLOUD_NAME: "dlr2olc8r",
    CLOUD_UPDATE_PRESET: "dentistry",
    EMAIL_SMPT: "mirastom2023@mail.ru",
    EMAIL_RECIEPIENT: "mirastom2023@gmail.com",
    EMAIL_PASSWORD: "2dJujpjXUDyA0YXd9fwi",
    PORT: " 5000",
    DB_NAME: "mirastomDB",
    DB_USER: "root",
    DB_PASSWORD: "password",
    DB_HOST: "localhost",
    DEFAULT_USER_IMAGE:
      "https://res.cloudinary.com/dlr2olc8r/image/upload/v1699090090/test/user_default_x6y6up.png	",
    REACT_APP_RECAPTCHA_SITE_KEY: "6Le3Zy0pAAAAAEdYTQRFesRv0kJe6bIEd_MPF7RY",
    REACT_APP_RECAPTCHA_SERVER_KEY: "6Le3Zy0pAAAAACnADRp-C9-kDXPS3hSQ5gdE16Jm",
    API_IMGBB_URL:
      "https://api.imgbb.com/1/upload?expiration=600&key=10ca40cde29b94318d8c9a9192d06f9e",
  },
};

module.exports = nextConfig;
