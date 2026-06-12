import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import crypto from "crypto";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import connectPgSimple from "connect-pg-simple";

import pool from "./config/db.js";
import sequelize from "./config/sequelize.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js"

import collectionRoutes from "./routes/collectionRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === "production" ||
    process.env.RENDER === "true" ||
    (process.env.DB_HOST && process.env.DB_HOST.includes("render.com"));
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const PgSessionStore = connectPgSimple(session);

if (!process.env.SESSION_SECRET) {
    console.warn("SESSION_SECRET no está configurado. Las sesiones se invalidarán al reiniciar.");
}

if (isProduction) {
    app.set("trust proxy", 1);
}

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));

app.disable("x-powered-by");

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            fontSrc: ["'self'", "https://cdn.jsdelivr.net", "data:"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
            formAction: ["'self'"]
        }
    }
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false
}));

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: "Demasiados intentos. Esperá unos minutos antes de volver a intentar."
});

app.use(express.urlencoded({
    extended: true,
    limit: "20kb",
    parameterLimit: 50
}));
app.use(express.json({ limit: "20kb" }));

app.use(session({
    name: "fotaza.sid",
    secret: sessionSecret,
    store: new PgSessionStore({
        pool,
        createTableIfMissing: true
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    res.locals.sessionUser = req.session.user || null;
    next();
});

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.redirect("/login")
});

app.use("/login", authLimiter);
app.use("/register", authLimiter);
app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/notifications", notificationRoutes);
app.use("/collections", collectionRoutes);
app.use("/interests", interestRoutes);
app.use("/reports", reportRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

app.use((req, res) => {
    res.status(404).send("Página no encontrada.");
});

app.use((error, req, res, next) => {
    console.error(error);

    if (res.headersSent) {
        return next(error);
    }

    const status = error.status || error.statusCode || 500;
    const message = status >= 500
        ? "Ocurrió un error interno."
        : error.message;

    res.status(status).send(message);
});

sequelize.authenticate()
    .then(() => console.log("Sequelize conectado ✅"))
    .catch(error => console.log("Error Sequelize ❌", error));

app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});
