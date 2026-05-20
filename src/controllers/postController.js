import { createPostModel, getAllPosts, searchPosts, getPostById } from "../models/postModel.js";
import { createComment, getCaommentsByPost } from "../models/commentModel.js";
import {
    followUser,
    unfollowUser,
    countFollowers,
    countFollowing,
    isFollowing
} from "../models/followModel.js";
import { createRating, getRatingByPost } from "../models/ratingModel.js";
import { createNotification } from "../models/notificationModel.js";

export const showCreatePost = (req, res) => {

    res.render("createPost");
};

export const createPost = async (req, res) => {

    try {

        const imagen = req.file.filename;

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

        res.send("Post guardado en DB ✅");

    } catch (error) {

        console.log(error);

        res.send("Error creando post ❌");
    }
};

export const showFeed = async (req, res) => {

    try {

        const { busqueda } = req.query;

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

        res.render("feed", { posts });

    } catch (error) {

        console.log(error);

        res.redirect("/posts/feed");
    }
}

export const addComment = async (req, res) => {

    try {

        const { post_id, comentario } = req.body;

        const user_id = req.session.user.id;

        await createComment(
            user_id,
            post_id,
            comentario
        );

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];

        if (post.user_id !== user_id) {
            await createNotification(
                post.user_id,
                user_id,
                "comentario",
                "comentó tu publicación"
            );
        }

        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error al comentar ❌")
    }
}

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

        res.send("Eror al seguir al usuario ❌")
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


        await createRating(user_id, post_id, valor);

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];

        if (post.user_id !== user_id) {
            await createNotification (
                post.user_id,
                user_id,
                "valoracion",
                "valoro tu publicacion"
            );
        } 

        res.redirect("/posts/feed");

    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};