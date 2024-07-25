import express from "express";
import cors from 'cors';
import "./config/mongoose";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());


app.use('/', router);

app.listen(8000, () => {
  console.log(`Server running on port ${PORT}`);
});