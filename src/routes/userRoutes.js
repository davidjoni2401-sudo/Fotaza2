import express from "express";
import { showProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", showProfile);

export default router;
