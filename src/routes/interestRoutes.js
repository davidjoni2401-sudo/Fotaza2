import express from "express";

import {
    storeInterest,
    showInterests
} from "../controllers/interestController.js";

const router = express.Router();

const requiereLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

router.post("/", requiereLogin, storeInterest);

router.get("/", requiereLogin, showInterests);


export default router;