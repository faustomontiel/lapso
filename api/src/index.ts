import "reflect-metadata";
//import { connect } from "./config/typeorm";
import dotenv from 'dotenv';
import { startServer } from "./app";
dotenv.config();

async function main() {
  //connect();
  const app = await startServer();
  app.listen(3000);
  console.log("Server on port 3000");
}

main();