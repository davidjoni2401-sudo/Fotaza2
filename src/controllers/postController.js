import { createPostModel, getAllPosts, searchPosts, getPostById, getPostsByUserIds, setPostCommentsClosed } from "../models/postModel.js";
import {
    createComment,
    getCaommentsByPost,
    updateOwnComment,
    deleteOwnComment
} from "../models/commentModel.js";
import {
    followUser,
    unfollowUser,
    countFollowers,
    countFollowing,
    isFollowing,
    getFollowingIds
} from "../models/followModel.js";
import { createRating, getRatingByPost } from "../models/ratingModel.js";
import { createNotification } from "../models/notificationModel.js";
import { getCollectionsByUser } from "../models/collectionModel.js";


const hydratePosts = async (posts, req) => {
    for (const post of posts) {
        const commentsResult = await getCaommentsByPost(post.id);
        post.comments = commentsResult.rows;
        post.comments.forEach(comment => {
            comment.isOwner = req.session.user?.id === comment.user_id;
        });

        if (req.session.user) {
            const followingResult = await isFollowing(
                req.session.user.id,
                post.user_id
            );

            post.isFollowing = followingResult.rows.length > 0;
            post.isOwner = req.session.user.id === post.user_id;
        } else {
            post.isFollowing = false;
            post.isOwner = false;
        }

        const followersResult = await countFollowers(post.user_id);
        const followingResultCount = await countFollowing(post.user_id);

        post.followersCount = followersResult.rows[0].total;
        post.followingCount = followingResultCount.rows[0].total;

        const ratingResult = await getRatingByPost(post.id);

        post.ratingPromedio = ratingResult.rows[0].promedio;
        post.ratingCantidad = ratingResult.rows[0].cantidad;
    }
};

const getUserCollections = async (req) => {
    if (!req.session.user) {
        return [];
    }

    const collectionsResult = await getCollectionsByUser(req.session.user.id);
    return collectionsResult.rows;
};
export const showCreatePost = (req, res) => {

    res.render("createPost");
};

export const createPost = async (req, res) => {

    try {

        const imagen = req.file.path;

        const { titulo, descripcion, etiquetas, licencia, marca_agua } = req.body;

        const user_id = req.session.user.id;

        await createPostModel(
            user_id,
            titulo,
            imagen,
            descripcion,
            etiquetas,
            licencia,
            marca_agua
        );

        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error creando post ❌");
    }
};

export const showFeed = async (req, res) => {

    try {

        const busqueda = req.query.busqueda?.trim() || "";

        let result;

        if (busqueda) {
            result = await searchPosts(busqueda);
        } else {
            result = await getAllPosts();
        }

        const posts = result.rows;

        for (const post of posts) {

            const commentsResult =
                await getCaommentsByPost(post.id);

            post.comments = commentsResult.rows;
            post.comments.forEach(comment => {
                comment.isOwner = req.session.user?.id === comment.user_id;
            });

            if (req.session.user) {

                const followingResult = await isFollowing(
                    req.session.user.id,
                    post.user_id
                );

                post.isFollowing = followingResult.rows.length > 0;

                post.isOwner = req.session.user.id === post.user_id;

            } else {

                post.isFollowing = false;

                post.isOwner = false;
            }

            const followersResult = await countFollowers(post.user_id);
            const followingResultCount = await countFollowing(post.user_id);

            post.followersCount = followersResult.rows[0].total;
            post.followingCount = followingResultCount.rows[0].total;

            const ratingResult = await getRatingByPost(post.id);

            post.ratingPromedio = ratingResult.rows[0].promedio;
            post.ratingCantidad = ratingResult.rows[0].cantidad;
        }

        console.log(posts);

        let collections = [];

        if (req.session.user) {
            const collectionsResult = await getCollectionsByUser(req.session.user.id);
            collections = collectionsResult.rows;
        }

        res.render("feed", { posts, collections, busqueda });

    } catch (error) {

        console.log(error);

        res.send("Error al cargar el feed: " + error.message);
    }
}

export const addComment = async (req, res) => {

    try {

        const { post_id, comentario } = req.body;
        const user_id = req.session.user.id;

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];

        if (!post || post.comentarios_cerrados) {
            return res.redirect("/posts/feed");
        }

        await createComment(
            user_id,
            post_id,
            comentario
        );

        if (post.user_id !== user_id) {
            await createNotification(
                post.user_id,
                user_id,
                "comentario",
                "comento tu publicacion"
            );
        }

        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error al comentar");
    }
}

export const editComment = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { comment_id, comentario } = req.body;
        const cleanComment = comentario?.trim();

        if (!cleanComment) {
            return res.redirect("/posts/feed");
        }

        await updateOwnComment(comment_id, user_id, cleanComment);
        res.redirect("/posts/feed");
    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const deleteComment = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { comment_id } = req.body;

        await deleteOwnComment(comment_id, user_id);
        res.redirect("/posts/feed");
    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const follow = async (req, res) => {

    try {

        const follower_id = req.session.user.id;

        const { following_id } = req.body;

        if (follower_id == following_id) {

            return res.send(
                "No podes seguirte a vos mismo ❌"
            );
        }

        await followUser(
            follower_id,
            following_id
        );

        await createNotification(
            following_id,
            follower_id,
            "follow",
            "comenzo a seguirte"
        );

        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error al seguir al usuario ❌")
    }
};

export const unfollow = async (req, res) => {

    try {

        const follower_id = req.session.user.id;

        const { following_id } = req.body;

        await unfollowUser(
            follower_id,
            following_id
        );

        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error al dejar de seguir ❌");
    }
};

export const ratePost = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id, valor } = req.body;

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];

        if (!post || post.user_id === user_id) {
            return res.redirect("/posts/feed");
        }

        await createRating(user_id, post_id, valor);

        await createNotification(
            post.user_id,
            user_id,
            "valoracion",
            "valoro tu publicacion"
        );

        res.redirect("/posts/feed");

    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};
export const showFollowingFeed = async (req, res) => {
    try {
        const followingIds = await getFollowingIds(req.session.user.id);
        const result = await getPostsByUserIds(followingIds);
        const posts = result.rows;

        await hydratePosts(posts, req);

        const collections = await getUserCollections(req);

        res.render("feed", {
            posts,
            collections,
            feedTitle: "Publicaciones de usuarios que sigo"
        });
    } catch (error) {
        console.log(error);
        res.send("Error al cargar publicaciones seguidas: " + error.message);
    }
};


export const toggleComments = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id, cerrar } = req.body;

        await setPostCommentsClosed(
            post_id,
            user_id,
            cerrar === "true"
        );

        res.redirect("/posts/feed");
    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};


