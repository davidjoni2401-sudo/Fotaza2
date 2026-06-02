import {
    createPostReport,
    countReportsByPost,
    markPostForReview,
    getReportedPosts,
    dismissReportsByPost,
    removePost,
    createCommentReport,
    getReportedComments,
    dismissCommentReports,
    removeComment
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
        const commentResult = await getReportedComments();

        res.render("reportedPosts", {
            reports: result.rows,
            commentReports: commentResult.rows
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
export const reportComment = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { comment_id, motivo, descripcion } = req.body;

        await createCommentReport(
            user_id,
            comment_id,
            motivo,
            descripcion
        );

        res.redirect("/posts/feed");
    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const dismissCommentReport = async (req, res) => {
    try {
        const { comment_id } = req.body;
        await dismissCommentReports(comment_id);
        res.redirect("/reports");
    } catch (error) {
        console.log(error);
        res.send("Error al desestimar denuncias de comentario");
    }
};

export const removeReportedComment = async (req, res) => {
    try {
        const { comment_id } = req.body;
        await removeComment(comment_id);
        res.redirect("/reports");
    } catch (error) {
        console.log(error);
        res.send("Error al borrar comentario denunciado");
    }
};
