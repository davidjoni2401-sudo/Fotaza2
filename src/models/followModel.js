import pool from "../config/db.js";

export const followUser = async (
    follower_id,
    following_id
) => {

    return await pool.query(

        `
        INSERT INTO followers
        (follower_id, following_id)

        VALUES ($1, $2)
        `,
        [follower_id, following_id]
    );
};

export const unfollowUser = async (
    follower_id,
    following_id
) => {

    return await pool.query(

        `
        DELETE FROM followers
        

        WHERE follower_id = $1
        AND following_id = $2
        `,
        [follower_id, following_id]
    );
};

export const countFollowers = async (
    user_id
) => {

    return await pool.query(

        `
        SELECT COUNT(*) AS total

        FROM followers

        WHERE following_id = $1
        `,
        [user_id]
    );
};

export const countFollowing = async (
    user_id
) => {

    return await pool.query(

        `
        SELECT COUNT(*) AS total

        FROM followers

        WHERE follower_id = $1
        `,
        [user_id]
    );
};
