import { Notification, User } from "../sequelizeModels/index.js";

export const createNotification = async (
    user_id,
    from_user_id,
    tipo,
    mensaje
) => {
    return await Notification.create({
        user_id,
        from_user_id,
        tipo,
        mensaje
    });
};

export const getNotificationsByUser = async (user_id) => {
    const notifications = await Notification.findAll({
        where: { user_id },
        include: [{
            model: User,
            as: "fromUser",
            attributes: ["nombre"]
        }],
        order: [["id", "DESC"]]
    });

    return {
        rows: notifications.map(notification => {
            const plain = notification.get({ plain: true });

            return {
                ...plain,
                from_nombre: plain.fromUser.nombre
            };
        })
    };
};

export const markNotificationAsRead = async (id, user_id) => {
    return await Notification.update(
        { leida: true },
        {
            where: {
                id,
                user_id
            }
        }
    );
};
