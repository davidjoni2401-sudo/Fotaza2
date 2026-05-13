import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";

import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();


app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "fotaza_secret",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));


app.use(express.static("public"));


app.use("/", authRoutes);
app.use("/posts", postRoutes);


app.get("/", (req, res) => {
    res.send("Fotaza 2 funcionando 🚀");
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});