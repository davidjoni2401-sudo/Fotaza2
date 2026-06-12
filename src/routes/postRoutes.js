import express from "express";
import { 
    showCreatePost, 
    createPost, 
    showFeed, 
    addComment,
    follow,
    unfollow,
    ratePost,
    showFollowingFeed,
    toggleComments,
    editComment,
    deleteComment
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

router.get("/following", requireLogin, showFollowingFeed);

router.post("/comment", requireLogin, addComment);

router.post("/comment/edit", requireLogin, editComment);

router.post("/comment/delete", requireLogin, deleteComment);

router.post("/follow", requireLogin, follow);

router.post("/unfollow", requireLogin, unfollow);

router.post("/rate", requireLogin, ratePost);

router.post("/comments/toggle", requireLogin, toggleComments);

router.post(
    "/create",
    requireLogin,
    upload.array("imagenes", 5),
    createPost
);

export default router;


