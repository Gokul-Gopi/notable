import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./utils/connectToDB.js";
const app = express();
dotenv.config();
connectToMongoDB();

app.get("/", (req, res) => {
  return res.send("Server is running..");
});

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;
app.listen(PORT, () => {
  return console.log(
    `⚡️ Server is running on port ${PORT} in ${ENVIRONMENT} mode..`
  );
});
