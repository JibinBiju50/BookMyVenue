import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import venueRoutes from "./routes/venueRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import bookingInquiryRoutes from "./routes/bookingInquiryRoutes.js"
import ownerVenueRoutes from "./routes/ownerVenueRoutes.js";
import adminVenueRoutes from "./routes/adminVenueRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL ||"http://localhost:5173",
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
app.use("/api/booking-inquiries", bookingInquiryRoutes);
app.use("/api/owner/venues", ownerVenueRoutes);
app.use("/api/admin/venues", adminVenueRoutes);

export default app;