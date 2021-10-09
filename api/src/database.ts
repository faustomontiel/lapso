import mongoose from 'mongoose';
import config from "./config";

// Database Connection
mongoose
  .connect(config.MONGO_URI || "4000")
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"))