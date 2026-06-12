import { Op, literal } from "sequelize";
import { Post, PostImage, User } from "../sequelizeModels/index.js";

const ratingAverage = literal(`(
    SELECT COALESCE(AVG(ratings.valor), 0)
    FROM ratings
    WHERE ratings.post_id = "Post"."id"
)`);

const ratingCount = literal(`(
    SELECT COUNT(*)
    FROM ratings
    WHERE ratings.post_id = "Post"."id"
)`);

const buildPostQuery = ({
    busqueda = "",
    licencia = "",
    valoracionMinima = 0,
    orden = "destacadas",
    includeCopyright = true
} = {}) => {
    const where = {
        estado: "activo"
    };
    const conditions = [];

    if (!includeCopyright) {
        where.licencia = "sin copyright";
    } else if (["sin copyright", "con copyright"].includes(licencia)) {
        where.licencia = licencia;
    }

    if (busqueda) {
        const patron = `%${busqueda.trim()}%`;
        conditions.push({
            [Op.or]: [
                { descripcion: { [Op.iLike]: patron } },
                { titulo: { [Op.iLike]: patron } },
                { etiquetas: { [Op.iLike]: patron } },
                { "$User.nombre$": { [Op.iLike]: patron } }
            ]
        });
    }

    if (valoracionMinima > 0) {
        conditions.push(literal(`(
            SELECT COALESCE(AVG(ratings.valor), 0)
            FROM ratings
            WHERE ratings.post_id = "Post"."id"
        ) >= ${valoracionMinima}`));
    }

    if (conditions.length > 0) {
        where[Op.and] = conditions;
    }

    let order;

    if (orden === "recientes") {
        order = [["id", "DESC"]];
    } else if (orden === "valoradas") {
        order = [[ratingAverage, "DESC"], [ratingCount, "DESC"], ["id", "DESC"]];
    } else {
        order = [[literal(`CASE
            WHEN (
                SELECT COALESCE(AVG(ratings.valor), 0)
                FROM ratings
                WHERE ratings.post_id = "Post"."id"
            ) >= 4 AND (
                SELECT COUNT(*)
                FROM ratings
                WHERE ratings.post_id = "Post"."id"
            ) > 3 THEN 1
            ELSE 0
        END`), "DESC"], [ratingAverage, "DESC"], ["id", "DESC"]];
    }

    return {
        where,
        include: [{
            model: User,
            attributes: ["id", "nombre"],
            required: true
        }, {
            model: PostImage,
            as: "images",
            attributes: ["id", "url", "orden"],
            separate: true,
            order: [["orden", "ASC"]]
        }],
        order
    };
};

const mapPosts = posts => ({
    rows: posts.map(post => {
        const plain = post.get({ plain: true });

        return {
            ...plain,
            nombre: plain.User.nombre
        };
    })
});

export const createPostModel = async (
    user_id,
    titulo,
    imagenes,
    descripcion,
    etiquetas,
    licencia,
    marca_agua
) => {
    const post = await Post.create({
        user_id,
        titulo,
        imagen: imagenes[0],
        descripcion,
        etiquetas,
        licencia,
        marca_agua
    });

    await PostImage.bulkCreate(imagenes.map((url, orden) => ({
        post_id: post.id,
        url,
        orden
    })));

    return post;
};

export const getAllPosts = async (filters = {}) => {
    const posts = await Post.findAll(buildPostQuery(filters));

    return mapPosts(posts);
};

export const searchPosts = async (busqueda, filters = {}) => {
    const posts = await Post.findAll(buildPostQuery({
        ...filters,
        busqueda
    }));

    return mapPosts(posts);
};

export const getPostById = async (post_id) => {
    const post = await Post.findByPk(post_id, {
        include: [{
            model: PostImage,
            as: "images",
            attributes: ["id", "url", "orden"]
        }]
    });

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
        }, {
            model: PostImage,
            as: "images",
            attributes: ["id", "url", "orden"],
            separate: true,
            order: [["orden", "ASC"]]
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

export const getPostsByUserId = async (user_id, includeCopyright = true) => {
    const where = {
        estado: "activo",
        user_id
    };

    if (!includeCopyright) {
        where.licencia = "sin copyright";
    }

    const posts = await Post.findAll({
        where,
        include: [{
            model: PostImage,
            as: "images",
            attributes: ["id", "url", "orden"],
            separate: true,
            order: [["orden", "ASC"]]
        }],
        order: [["id", "DESC"]]
    });

    return {
        rows: posts.map(post => post.get({ plain: true }))
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
