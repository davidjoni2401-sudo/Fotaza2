import {
    PostReport,
    Post,
    User
} from "../sequelizeModels/index.js";

export const createPostReport = async (
    user_id,
    post_id,
    motivo,
    descripcion
) => {
    return await PostReport.create({
        user_id,
        post_id,
        motivo,
        descripcion
    });
};

export const countReportsByPost = async (post_id) => {
    const total = await PostReport.count({
        where: { post_id },
        distinct: true,
        col: "user_id"
    });

    return total;
};

export const markPostForReview = async (post_id) => {
    return await Post.update(
        { estado: "revision" },
        { where: { id: post_id } }
    );
};

export const getReportedPosts = async () => {
    const reports = await PostReport.findAll({
        include: [
            {
                model: Post,
                include: [{
                    model: User,
                    attributes: ["id", "nombre", "email"]
                }]
            },
            {
                model: User,
                attributes: ["nombre", "email"]
            }
        ],
        order: [["created_at", "DESC"]]
    });

    return {
        rows: reports.map(report => report.get({ plain: true }))
    };
};

export const dismissReportsByPost = async (post_id) => {
    await PostReport.destroy({
        where: { post_id }
    });

    return await Post.update(
        { estado: "activo" },
        { where: { id: post_id } }
    );
};

export const removePost = async (post_id) => {
    return await Post.update(
        { estado: "bajado" },
        { where: { id: post_id } }
    );

    return await PostReport.destroy({
        where: { post_id }
    });

    const post = await Post.findByPk(post_id);
    const bajadas = await Post.count({
        where: { user_id: post.user_id, estado: "bajado" }
    });
    if (bajadas >= 3) {
        await User.update(
            { estado: "inactivo" },
            { where: { id: post.user_id } }
        );
    }
};