import { Comment, User } from "../sequelizeModels/index.js";

export const createComment = async (
    user_id,
    post_id,
    comentario
) => {
    return await Comment.create({
        user_id,
        post_id,
        comentario
    });
};

export const getCaommentsByPost = async (post_id) => {
    const comments = await Comment.findAll({
        where: { post_id },
        include: [{
            model: User,
            attributes: ["nombre"]
        }],
        order: [["id", "ASC"]]
    });

    return {
        rows: comments.map(comment => {
            const plain = comment.get({ plain: true });

            return {
                ...plain,
                nombre: plain.User.nombre
            };
        })
    };
};

export const updateOwnComment = async (comment_id, user_id, comentario) => {
    return await Comment.update(
        { comentario },
        {
            where: {
                id: comment_id,
                user_id
            }
        }
    );
};

export const deleteOwnComment = async (comment_id, user_id) => {
    return await Comment.destroy({
        where: {
            id: comment_id,
            user_id
        }
    });
};
