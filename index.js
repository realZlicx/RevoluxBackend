import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { databaseModule } from "./database/index.js";
import router from "./router/index.js";

const app = express();
console.log(process.env.HELLO);
app.use(cors());
app.use(express.json());
app.use(router);
const { connectToDatabase } = databaseModule;

connectToDatabase(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
  );
});
