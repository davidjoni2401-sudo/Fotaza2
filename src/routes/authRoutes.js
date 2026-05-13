import express from "express";

import {
    showRegister,
    register,
    showLogin,
    login
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegister);

router.post("/register", register);

router.get("/login", showLogin);

router.post("/login", login);

export default router;