import {
    createInterest,
    getInterestsByPostOwner
} from "../models/notificationModel.js";

import { getPostById } from "../models/postModel.js";
import { createNotification } from "../models/notificationModel.js";


export const storeInterest = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { post_id, mensaje } = req.body;

        const postResult = await getPostById(post_id);
        const post = postResult.rows[0];


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
        res.send("Erroo al cargar interesados ❌");
    }
};