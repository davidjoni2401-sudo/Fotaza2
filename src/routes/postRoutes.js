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

router.get("/create", showCreatePost);

router.get("/feed", showFeed);

router.post("/comment", addComment);

router.post("/follow", follow);

router.post("/unfollow", unfollow);

router.post(
    "/create",
    upload.single("imagen"),
    createPost
);

export default router;