import app from './app.js';
import { initializeDatabase } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`KMRF Backend Server: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to initialize the database", error);
    process.exit(1);
  }
};

startServer();