import pool from "../config/db.js";


export const createUser = async (nombre, email, password) => {
    const query = `
        INSERT INTO users (nombre, email, password)
        VALUES ($1, $2, $3)
    `;

    return await pool.query(query, [nombre, email, password]);
};