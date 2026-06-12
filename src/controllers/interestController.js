import {
    createInterest,
    getInterestsByPostOwner
} from "../models/interestModel.js";

import { getPostById } from "../models/postModel.js";
import { createNotification } from "../models/notificationModel.js";


export const storeInterest = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id } = req.body;
        const mensaje = req.body.mensaje?.trim() || null;

        if (mensaje && mensaje.length > 1000) {
            return res.status(400).send("El mensaje es demasiado largo.");
        }

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];

        if (!post || post.estado !== "activo") {
            return res.redirect("/posts/feed");
        }

        if (post.user_id === user_id) {
            return res.redirect("/posts/feed");
        }

        await createInterest(
            user_id,
            post_id,
            mensaje
        );

        await createNotification(
            post.user_id,
            user_id,
            "interes",
            "marco me interesa en tu publicacion"
        );

        res.redirect("/posts/feed");

    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const showInterests = async (req, res) => {
    try {
        const user_id = req.session.user.id;

        const result = await getInterestsByPostOwner(user_id);

        res.render("interests", {
            interests: result.rows
        });


    } catch (error) {
        console.log(error);
        res.send("Error al cargar interesados ❌");
    }
};
