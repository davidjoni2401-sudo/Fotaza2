import express from "express";

import {
    showCollections,
    storeCollection,
    savePostInCollection,
    showCollectionPosts
} from "../controllers/collectionController.js"

const router = express.Router();

const requiereLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

router.get("/", requiereLogin, showCollections);

router.post("/", requiereLogin, storeCollection);

router.post("/save", requiereLogin, savePostInCollection);

router.get("/:id", requiereLogin, showCollectionPosts );

export default router;