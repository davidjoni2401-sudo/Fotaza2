import express from "express";
import { showCreatePost, createPost } from "../controllers/postController";
import upload from "../config/multer";


const router = express.Router();

router.get("/", showCreatePost);

router.post(
    "/create",
    upload.single("imagen"),
    createPost
);

export default router;