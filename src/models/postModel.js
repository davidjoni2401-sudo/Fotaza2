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
        SELECT * FROM posts 
        ORDER BY Created_at desc
    `;

    return await pool.query(query);
} 