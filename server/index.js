import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3001;
const API_VERSION = process.env.API_VERSION || undefined;

if (API_VERSION === undefined) {
  console.log("API_VERSION is not defined in .env file");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
const API_PATH = `/api/${API_VERSION}`;
app.use(`${API_PATH}/auth`, authRouter);
app.use(`${API_PATH}/users`, userRouter);
app.use(`${API_PATH}/posts`, postRouter);

/* DATABASE */
async function mongooseConnection() {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error.message);
  }
}

/* Server */
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

/* Start Server */
mongooseConnection().then(startServer);
