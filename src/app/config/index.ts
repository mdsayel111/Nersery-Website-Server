import * as dotenv from "dotenv";

// config dotenv
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL as string,
};

export default config;
