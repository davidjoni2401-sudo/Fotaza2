import { findUserById } from "../models/userModel.js";
import { getPostsByUserId } from "../models/postModel.js";
import {
    countFollowers,
    countFollowing,
    isFollowing
} from "../models/followModel.js";

export const showProfile = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(404).send("Usuario no encontrado.");
        }

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).send("Usuario no encontrado.");
        }

        const [postsResult, followersResult, followingResult] = await Promise.all([
            getPostsByUserId(userId, Boolean(req.session.user)),
            countFollowers(userId),
            countFollowing(userId)
        ]);

        let following = false;

        if (req.session.user && req.session.user.id !== userId) {
            const followingResultForViewer = await isFollowing(req.session.user.id, userId);
            following = followingResultForViewer.rows.length > 0;
        }

        res.render("profile", {
            user,
            posts: postsResult.rows,
            followersCount: followersResult.rows[0].total,
            followingCount: followingResult.rows[0].total,
            isOwner: req.session.user?.id === userId,
            isFollowing: following
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar el perfil.");
    }
};
