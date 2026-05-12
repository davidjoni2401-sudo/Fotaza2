import express from "express";

import {
    showRegister,
    register
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegister);

router.post("/register", register);

router.get("/login", (req, res) => {
    res.send("Página login");
});

export default router;