import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
    origin: "http:/localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookMyVenue backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);

export default app;