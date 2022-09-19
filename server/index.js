import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  return res.send("Server running on port 5000");
});

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;
app.listen(PORT, () => {
  return console.log(`server running on port ${PORT} in ${ENVIRONMENT} mode..`);
});
