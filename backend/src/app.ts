import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import routes from "./routes/v1.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { HTTP_STATUS } from "./shared/constants/http-status.js";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  return res.status(HTTP_STATUS.OK).json(
    {
      success: true,
      message: "InvoicePro Backend Running",
      data: {
        timestamp: new Date().toISOString(),
      }
    }
  );
});

app.use("/api/v1", routes);

app.use("*", (_req, res) => {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
      success:false,
      message:"Route not found."
    });
});

app.use(errorMiddleware);

export default app;