import express from "express";
import mainRouter from "../src/routes/mainRouter";
import { connectDB } from "../src/utils/db";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", mainRouter);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
})();
