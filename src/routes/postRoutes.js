import express from "express";
import { 
    showCreatePost, 
    createPost, 
    showFeed, 
    addComment,
    follow,
    unfollow 
} from "../controllers/postController.js";
import upload from "../config/multer.js";


const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

router.get("/create", requireLogin, showCreatePost);

router.get("/feed", showFeed);

router.post("/comment", addComment);

router.post("/follow", requireLogin, follow);

router.post("/unfollow", requireLogin, unfollow);

router.post(
    "/create",
    requireLogin,
    upload.single("imagen"),
    createPost
);

export default router;