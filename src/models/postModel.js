import pool from "../config/db.js";

export const createPostModel = async ( user_id, titulo, imagen, descripcion, etiquetas, licencia, marca_agua) => {
    const query = `
        INSERT INTO posts (
            user_id,
            titulo,
            imagen,
            descripcion,
            etiquetas,
            licencia,
            marca_agua
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    return await pool.query(query, [
        user_id,
        titulo,
        imagen,
        descripcion,
        etiquetas,
        licencia,
        marca_agua
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

export const searchPosts = async (busqueda) => {

    const query = `
        SELECT
            posts.*,
            users.nombre
        FROM posts
        JOIN users
            ON posts.user_id = users.id
        WHERE posts.descripcion ILIKE $1
        OR users.nombre ILIKE $1
        OR posts.titulo ILIKE $1
        OR posts.etiquetas ILIKE $1
        ORDER BY posts.created_at DESC
    `;

    return await pool.query(query, [`%${busqueda}%`]);
};