import express from "express";
import AuthRoutes from "./authRoute";
import ContentRoutes from "./contentRoute";
import BrainRoutes from "./brainRoute";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/content", ContentRoutes);
router.use("/brain", BrainRoutes);

export default router;
