import {
    createPostReport,
    countReportsByPost,
    markPostForReview,
    getReportedPosts,
    dismissReportsByPost,
    removePost,
    createCommentReport,
    getReportedComments,
    getReportedCommentsByPostOwner,
    dismissCommentReports,
    removeComment,
    dismissOwnCommentReports,
    removeOwnReportedComment as removeOwnReportedCommentModel
} from "../models/reportModel.js";

const validReportReasons = new Set([
    "contenido inapropiado",
    "copyright",
    "acoso",
    "spam",
    "otro"
]);

const validateReport = (motivo, descripcion) => {
    return validReportReasons.has(motivo) &&
        (!descripcion || descripcion.length <= 1000);
};

export const reportPost = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id, motivo } = req.body;
        const descripcion = req.body.descripcion?.trim() || null;

        if (!validateReport(motivo, descripcion)) {
            return res.status(400).send("Los datos de la denuncia son inválidos.");
        }

        await createPostReport(
            user_id,
            post_id,
            motivo,
            descripcion
        );

        const totalReports = await countReportsByPost(post_id);

        if (totalReports > 3) {
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
        const { comment_id, motivo } = req.body;
        const descripcion = req.body.descripcion?.trim() || null;

        if (!validateReport(motivo, descripcion)) {
            return res.status(400).send("Los datos de la denuncia son inválidos.");
        }

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

export const showOwnCommentReports = async (req, res) => {
    try {
        const result = await getReportedCommentsByPostOwner(req.session.user.id);

        res.render("ownCommentReports", {
            commentReports: result.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar denuncias de comentarios.");
    }
};

export const dismissOwnCommentReport = async (req, res) => {
    try {
        await dismissOwnCommentReports(req.body.comment_id, req.session.user.id);
        res.redirect("/reports/my-comments");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al desestimar la denuncia.");
    }
};

export const removeOwnReportedComment = async (req, res) => {
    try {
        await removeOwnReportedCommentModel(req.body.comment_id, req.session.user.id);
        res.redirect("/reports/my-comments");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el comentario.");
    }
};
