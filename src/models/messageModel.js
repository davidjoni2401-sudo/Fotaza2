import { Op } from "sequelize";
import { PrivateMessage, User } from "../sequelizeModels/index.js";

const includes = [
    {
        model: User,
        as: "sender",
        attributes: ["id", "nombre"]
    },
    {
        model: User,
        as: "recipient",
        attributes: ["id", "nombre"]
    }
];

export const createPrivateMessage = async (sender_id, recipient_id, mensaje) => {
    return await PrivateMessage.create({
        sender_id,
        recipient_id,
        mensaje
    });
};

export const getMessagesByUser = async (user_id) => {
    const messages = await PrivateMessage.findAll({
        where: {
            [Op.or]: [
                { sender_id: user_id },
                { recipient_id: user_id }
            ]
        },
        include: includes,
        order: [["created_at", "DESC"], ["id", "DESC"]]
    });

    return messages.map(message => message.get({ plain: true }));
};

export const getConversation = async (user_id, other_user_id) => {
    const messages = await PrivateMessage.findAll({
        where: {
            [Op.or]: [
                {
                    sender_id: user_id,
                    recipient_id: other_user_id
                },
                {
                    sender_id: other_user_id,
                    recipient_id: user_id
                }
            ]
        },
        include: includes,
        order: [["created_at", "ASC"], ["id", "ASC"]]
    });

    await PrivateMessage.update(
        { leido: true },
        {
            where: {
                sender_id: other_user_id,
                recipient_id: user_id
            }
        }
    );

    return messages.map(message => message.get({ plain: true }));
};
