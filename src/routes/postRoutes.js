import express from "express";
import { showCreatePost, createPost } from "../controllers/postController.js";
import upload from "../config/multer.js";


const router = express.Router();

router.get("/create", showCreatePost);

router.post(
    "/create",
    upload.single("imagen"),
    createPost
);

export default router;