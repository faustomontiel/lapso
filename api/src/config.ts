import { config } from "dotenv";

config();

export default {
  MONGO_URI: process.env.DATABASE || 'lapso',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'KEY_JWT',
};
