import { Op } from "sequelize";
import { Post, User } from "../sequelizeModels/index.js";

export const createPostModel = async (
    user_id,
    titulo,
    imagen,
    descripcion,
    etiquetas,
    licencia,
    marca_agua
) => {
    return await Post.create({
        user_id,
        titulo,
        imagen,
        descripcion,
        etiquetas,
        licencia,
        marca_agua
    });
};

export const getAllPosts = async () => {
    const posts = await Post.findAll({
        where: {
            estado: "activo"
        },
        include: [{
            model: User,
            attributes: ["nombre"]
        }],
        order: [["id", "DESC"]]
    });

    return {
        rows: posts.map(post => {
            const plain = post.get({ plain: true });

            return {
                ...plain,
                nombre: plain.User.nombre
            };
        })
    };
};

export const searchPosts = async (busqueda) => {
    const posts = await Post.findAll({
        include: [{
            model: User,
            attributes: ["nombre"],
            required: true
        }],
        where: {
            estado: "activo",
            [Op.or]: [
                { descripcion: { [Op.iLike]: `%${busqueda}%` } },
                { titulo: { [Op.iLike]: `%${busqueda}%` } },
                { etiquetas: { [Op.iLike]: `%${busqueda}%` } },
                { "$User.nombre$": { [Op.iLike]: `%${busqueda}%` } }
            ]
        },
        order: [["id", "DESC"]]
    });

    return {
        rows: posts.map(post => {
            const plain = post.get({ plain: true });

            return {
                ...plain,
                nombre: plain.User.nombre
            };
        })
    };
};

export const getPostById = async (post_id) => {
    const post = await Post.findByPk(post_id);

    return {
        rows: post ? [post.get({ plain: true })] : []
    };
};
export const getPostsByUserIds = async (userIds) => {
    if (!userIds || userIds.length === 0) {
        return { rows: [] };
    }

    const posts = await Post.findAll({
        where: {
            estado: "activo",
            user_id: { [Op.in]: userIds }
        },
        include: [{
            model: User,
            attributes: ["nombre"]
        }],
        order: [["id", "DESC"]]
    });

    return {
        rows: posts.map(post => {
            const plain = post.get({ plain: true });

            return {
                ...plain,
                nombre: plain.User.nombre
            };
        })
    };
};

export const setPostCommentsClosed = async (post_id, user_id, comentarios_cerrados) => {
    return await Post.update(
        { comentarios_cerrados },
        {
            where: {
                id: post_id,
                user_id
            }
        }
    );
};
