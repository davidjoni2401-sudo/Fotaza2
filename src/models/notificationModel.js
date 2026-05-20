import  pool from "../config/db.js";

export const createNotification = async (
    user_id,
    from_user_id,
    tipo,
    mensaje
) => {
    const query = `
        INSERT INTO notifications (
            user_id,
            from_user_id,
            tipo,
            mensaje
        )
        VALUES ($1, $2, $3, $4)
    `;


    return await pool.query(query, [
        user_id,
        from_user_id,
        tipo,
        mensaje
    ]);
};

export const getNotificationsByUser = async (user_id) => {
    const query =`
        SELECT
            notifications.*,
            users.nombre AS from_nombre
        FROM notifications
        JOIN users
            ON notifications.from_user_id = users.id
        WHERE notifications.user_id = $1
        ORDER BY notifications.created_at DESC
    `;

    return await pool.query(query, [user_id]);
};

export const markNotificationAsRead = async (Id, user_id) => {
    const query = `
        UPDATE notifications
        SET leida = true
        WHERE id = $1
        AND user_id = $2
    `;

    return await pool.query(query, [Id, user_id]);
};
