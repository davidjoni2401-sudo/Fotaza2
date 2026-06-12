import express from "express";

import {
    reportPost,
    showReportedPosts,
    dismissPostReports,
    removeReportedPost,
    reportComment,
    dismissCommentReport,
    removeReportedComment,
    showOwnCommentReports,
    dismissOwnCommentReport,
    removeOwnReportedComment
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

router.post("/comment", requiereLogin, reportComment);

router.get("/my-comments", requiereLogin, showOwnCommentReports);

router.post("/my-comments/dismiss", requiereLogin, dismissOwnCommentReport);

router.post("/my-comments/remove", requiereLogin, removeOwnReportedComment);

router.get("/", requiereValidador, showReportedPosts);

router.post("/dismiss", requiereValidador, dismissPostReports);

router.post("/remove", requiereValidador, removeReportedPost);

router.post("/comments/dismiss", requiereValidador, dismissCommentReport);

router.post("/comments/remove", requiereValidador, removeReportedComment);

export default router;

