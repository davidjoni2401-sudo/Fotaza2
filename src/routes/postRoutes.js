import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Página de publicaciones");
});

export default router;