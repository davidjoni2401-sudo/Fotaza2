import express from "express";
import { showCreatePost, createPost, showFeed, addComment} from "../controllers/postController.js";
import upload from "../config/multer.js";


const router = express.Router();

router.get("/create", showCreatePost);

router.get("/feed", showFeed);

router.post("/comment", addComment);

router.post(
    "/create",
    upload.single("imagen"),
    createPost
);

export default router;