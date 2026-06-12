import express from "express";
import {
    sendMessage,
    showMessages
} from "../controllers/messageController.js";

const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

router.get("/", requireLogin, showMessages);
router.post("/", requireLogin, sendMessage);

export default router;
