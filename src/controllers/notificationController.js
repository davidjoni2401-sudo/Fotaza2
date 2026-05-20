import {
    getNotificationsByUser,
    markNotificationAsRead
} from "../models/notificationModel.js";

export const showNotifications = async (requestAnimationFrame, res) => {
    try {
        const user_id = req.session.user.id;

        const result = await getNotificationsByUser(user_id);

        res.render("notifications", {
            notifications: result.rows
        });


    } catch (error) {
        console.log(error);
        res.send("Error al cargar notificaciones ❌");
    }
};

export const readNotification = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { id } = req.body;

        await markNotificationAsRead(id, user_id);

        res.redirect("/notifications");

     } catch (error) {
         console.log(error);
         res.send("Error al marcar notificacion ❌");
    }
};