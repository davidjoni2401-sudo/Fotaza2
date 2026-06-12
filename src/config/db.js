import pkg from "pg";
import dotenv from "dotenv";


dotenv.config();


const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === "production" ||
    (process.env.DB_HOST && process.env.DB_HOST.includes("render.com"));

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: isProduction ? {
        rejectUnauthorized: false
    } : false
})


pool.connect()
    .then(() => console.log("Base de datos conectada XD"))
    .catch((err) => console.log("Error DB:", err));


export default pool;
