import express, { Express } from "express";
import dotenv from "dotenv";
import { pino } from "pino";
import cors from "cors";
import helmet from "helmet";
import masterRouter from "./api";
import {connectDB} from "./config/database";
import rateLimit from "express-rate-limit";

dotenv.config();

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname,time",
    },
  },
});

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use(limiter);

app.use(express.json());
const frontendUrlLocal = process.env.FRONTEND_URL_LOCAL || 'http://localhost:5173';
const frontendUrlProd = process.env.FRONTEND_URL_PROD || 'https://cb-student-app.vercel.app/';

app.use(cors({
  origin: [
    frontendUrlLocal,
    frontendUrlProd
  ],
  credentials: true
}));
app.use(helmet());
// app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", masterRouter);

connectDB();

export { app, logger };
