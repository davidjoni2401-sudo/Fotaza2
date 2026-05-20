import express from "express";

import {
    showNotifications,
    readNotification
} from "../controllers/notificationController.js";

const router = express.Router();

const requiereLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

router.get("/", requiereLogin, showNotifications);

router.post("/read", requiereLogin, readNotification);


export default router;