import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", async (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "InvoicePro Backend Running",
    timestamp: new Date().toISOString(),
  });
});

export default app;