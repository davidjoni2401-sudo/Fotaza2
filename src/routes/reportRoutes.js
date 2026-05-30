import express from "express";

import {
    reportPost,
    showReportedPosts,
    dismissPostReports,
    removeReportedPost
} from "../controllers/reportController.js";

const router = express.Router();

const requiereLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

const requiereValidador = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    if (req.session.user.rol !== "validador") {
        return res.redirect("/posts/feed");
    }
    next();
};

router.post("/post", requiereLogin, reportPost);

router.get("/", requiereValidador, showReportedPosts);

router.post("/dismiss", requiereValidador, dismissPostReports);

router.post("/remove", requiereValidador, removeReportedPost);

export default router;