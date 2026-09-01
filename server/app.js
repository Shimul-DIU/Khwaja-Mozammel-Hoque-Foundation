import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authDevoteeRouter from "./routes/authDevoteeRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import devoteeRouter from "./routes/devoteeRoute.js";
import donateRoute from "./routes/donationRoutes.js";

const app = express();

app.use(helmet());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://foundation-a7d60.web.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "অনেক বেশি request করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
  },
});

app.use("/api", apiLimiter);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KMRF backend server is running",
  });
});

app.use("/api/auth", authDevoteeRouter);
app.use("/api/devotee", devoteeRouter);

// ====donation Route=========
app.use("/donations", donateRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use(errorMiddleware);

export default app;