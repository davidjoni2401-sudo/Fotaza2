import pool from "../config/db.js";

export const createRating = async (user_id, post_id, valor) => {
    const query =`
        INSERT INTO ratings (user_id, post_id, valor)
        VALUES ($1, $2, $3)
    `;

    return await pool.query(query,[user_id, post_id, valor]);
};

export const getRatingByPost = async (post_id) => {
    const query = `
        SELECT
            COALESCE(ROUND(AVG(valor), 1), 0) AS promedio,
            COUNT(*) AS cantidad
        FROM ratings
        WHERE post_id = $1
    `;

    return await pool.query(query, [post_id]);
};