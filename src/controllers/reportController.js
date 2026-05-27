import {
    createPostReport,
    countReportsByPost,
    markPostForReview,
    getReportedPosts,
    dismissReportsByPost,
    removePost
} from "../models/reportModel.js";

export const reportPost = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id, motivo, descripcion } = req.body;

        await createPostReport(
            user_id,
            post_id,
            motivo,
            descripcion
        );

        const totalReports = await countReportsByPost(post_id);

        if (totalReports >= 3) {
            await markPostForReview(post_id);
        }

        res.redirect("/posts/feed");

    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const showReportedPosts = async (req, res) => {
    try {
        const result = await getReportedPosts();

        res.render("reportedPosts", {
            reports: result.rows
        });

    } catch (error) {
        console.log(error);
        res.send("Error al cargar denuncias ❌");
    }
};

export const dismissPostReports = async (req, res) => {
    try {
        const { post_id } = req.body;

        await dismissReportsByPost(post_id);

        res.redirect("/reports");

    } catch (error) {
        console.log(error);
        res.send("Error al desestimar denuncias ❌");
    }
};

export const removeReportedPost = async (req, res) => {
    try {
        const { post_id } = req.body;

        await removePost(post_id);

        res.redirect("/reports");

    } catch (error) {
        console.log(error);
        res.send("Error al bajar publicación ❌");
    }
};