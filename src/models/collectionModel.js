import {Collection, CollectionPost, Post, User } from "../sequelizeModels/index.js";

export const createCollection = async (user_id, nombre) => {
    return await Collection.create({
        user_id,
        nombre
    });
};

export const getCollectionsByUser = async (user_id) => {
    const collections = await Collection.findAll({
        where: { user_id },
        order: [["id", "DESC"]]
    });

    return {
        rows: collections.map(collection => 
            collection.get({ plain: true })
        )
    };
};

export const addPostToCollection = async (collection_id, post_id, user_id) => {
    const collection = await Collection.findOne({
        where: {
            id: collection_id,
            user_id
        }
    });

    if (!collection) {
        return null;
    }

    return await CollectionPost.create({
        collection_id,
        post_id
    });
};

export const getPostsByCollection = async (collection_id, user_id) => {
    const savedPosts = await CollectionPost.findAll({
        where: { collection_id },
        include: [
            {
                model: Collection,
                where: { user_id },
                attributes: []
            },
            {
                model: Post,
                include: [{
                    model: User,
                    attributes: ["nombre"]
                }]
            }
        ],
        order: [["id", "DESC"]]
    });

    return {
        rows: savedPosts.map(item => {
            const plain = item.get({ plain: true });
            const post = plain.Post;

            return {
                ...post,
                autor: post.User.nombre
            };
        })
    };
};
