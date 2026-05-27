import {
    Interest,
    User,
    Post
} from "../sequelizeModels/index.js";

export const createInterest = async (
    user_id,
    post_id,
    mensaje
) => {
    return await Interest.create({
        user_id,
        post_id,
        mensaje
    });
};

export const getInterestsByPostOwner = async (owner_id) => {
    const interests = await Interest.findAll({
        include: [
            {
                model: Post,
                where: { user_id: owner_id }
            },
            {
                model: User,
                attributes: ["nombre" , "email"]
            }
        ],
        order: [["created_at", "DESC"]]
    });

    return {
        rows: interests.map(interest => {
            const plain = interest.get({ plain: true });

            return {
                ...plain,
                interesado_nombre: plain.User.nombre,
                interesado_email: plain.User.email,
                post_titulo: plain.Post.titulo,
                post_imagen: plain.Post.imagen
            };
        })
    };
};