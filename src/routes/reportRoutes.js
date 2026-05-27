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

router.post("/post", requiereLogin, reportPost);

router.get("/", requiereLogin, showReportedPosts);

router.post("/dismiss", requiereLogin, dismissPostReports);

router.post("/remove", requiereLogin, removeReportedPost);

export default router;