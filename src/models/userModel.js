import pool from "../config/db.js";


export const createUser = async (nombre, email, password) => {
    const query = `
        INSERT INTO users (nombre, email, password)
        VALUES ($1, $2, $3)
    `;

    return await pool.query(query, [nombre, email, password]);
};

export const findUserByEmail = async (email) => {

    const query = `
        SELECT * FROM users
        WHERE email = $1
    `;

    return await pool.query(query, [email]);
};