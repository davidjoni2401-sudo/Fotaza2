import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";

import "./config/db.js";
import sequelize from "./config/sequelize.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js"

import collectionRoutes from "./routes/collectionRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

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

app.use((req, res, next) => {
    res.locals.sessionUser = req.session.user || null;
    next();
});

app.use(express.static("public"));


app.use(express.static("public"));


app.get("/", (req, res) => {
    res.redirect("/login")
});

app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/notifications", notificationRoutes);
app.use("/collections", collectionRoutes);
app.use("/interests", interestRoutes);
app.use("/reports", reportRoutes);

sequelize.authenticate()
    .then(() => console.log("Sequelize conectado ✅"))
    .catch(error => console.log("Error Sequelize ❌", error));

app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});
