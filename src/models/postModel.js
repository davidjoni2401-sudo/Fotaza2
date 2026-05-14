import pool from "../config/db.js";

export const createPostModel = async ( user_id, imagen, descripcion) => {
    const query = `
        INSERT INTO posts (
            user_id,
            imagen,
            descripcion
        )
        VALUES ($1, $2, $3)
    `;

    return await pool.query(query, [
        user_id,
        imagen,
        descripcion
    ])
};

export const getAllPosts = async () => {

    const query = `
        SELECT
            posts.*,
            users.nombre
        FROM posts
        JOIN users
            ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    `;

    return await pool.query(query);
} 