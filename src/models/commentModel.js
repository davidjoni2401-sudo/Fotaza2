import pool from "../config/db.js";

export const createComment = async (
    user_id,
    post_id,
    comentario
) => {

    const query = `
        INSERT INTO comments
        (user_id, post_id, comentario)
        VALUES ($1, $2, $3)
    `;

    return await pool.query(query, [
        user_id,
        post_id,
        comentario
    ]);
};

export const getCaommentsByPost = async (post_id) => {

    const query = `
       SELECT
            comments.*,
            users.nombre
       FROM comments
       JOIN users
            on comments.user_id = users.id
       WHERE post_id = $1
       ORDER BY Comments.created_at ASC
    `;

    return await pool.query(query, [post_id]);
};