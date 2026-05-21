import pool from "../config/db.js";

export const createCollection = async (user_id, nombre) => {
    const query = `
        INSERT INTO collections (user_id, nombre)
        VALUES ($1, $2)
    `;

    return await pool.query(query, [user_id, nombre]);
};

export const getCollectionByUser = async (user_id) => {
    const query = `
        SELECT *
        FROM collections
        WHERE user_id = $1
        ORDER BY created_at DESC
    `;

    return await pool.query(query, [user_id]);
};

export const addPostToCollection = async (collection_id, post_id) => {
    const query = `
        SELECT
            posts.*,
            users.nombre AS autor
        FROM collection_posts
        JOIN collections
            ON collection_posts.collection_id = collections.id
        JOIN posts
            ON collection_posts.post_id = posts.id
        JOIN users
            ON posts.user_id = users.id
        WHERE collection_posts.collection_id = $1
        AND collections.user_id = $2
        ORDER BY collection_posts.created_at DESC
    `;

    return await pool.query(query, [collection_id, user_id]);
};

export const getPostsByCollection = async (collection_id, user_id) => {
    const query = `
        SELECT
            posts.*,
            users.nombre AS autor
        FROM collection_posts
        JOIN collections
            ON collection_posts.collection_id = collections.id
        JOIN posts
            ON collection_posts.post_id = posts.id
        JOIN users
            ON posts.user_id = users.id
        WHERE collection_posts.collection_id = $1
        AND collections.user_id = $2
        ORDER BY collection_posts.created_at DESC
    `;

    return await pool.query(query, [collection_id, user_id]);
};