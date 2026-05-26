import { Follow } from "../sequelizeModels/index.js";

export const followUser = async (
    follower_id,
    following_id
) => {

    return await Follow.create({
        follower_id,
        following_id
    });
};

export const unfollowUser = async (
    follower_id,
    following_id
) => {

    return await Follow.destroy({
        where: {
            follower_id,
            following_id
        }
    })
};

export const countFollowers = async (
    user_id
) => {
    const total = await Follow.count({
        where: {
            following_id: user_id
        }
    });

    return {
        rows: [{ total }]
    };
};

export const countFollowing = async (
    user_id
) => {
    const total = await Follow.count({
        where: {
            follower_id: user_id
        }
    });

    return {
        rows: [{ total }]
    };
};

export const isFollowing = async (follower_id, following_id) => {
    const follow = await Follow.findOne({
        where: {
            follower_id,
            following_id
        }
    });

    return {
        rows: follow ? [follow.get({ plain: true })] : []
    };
};