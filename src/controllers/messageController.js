import { findUserById } from "../models/userModel.js";
import {
    createPrivateMessage,
    getConversation,
    getMessagesByUser
} from "../models/messageModel.js";

export const showMessages = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const requestedUserId = Number(req.query.user_id);
        const otherUser = Number.isInteger(requestedUserId) && requestedUserId > 0
            ? await findUserById(requestedUserId)
            : null;

        const messages = otherUser && otherUser.id !== userId
            ? await getConversation(userId, otherUser.id)
            : await getMessagesByUser(userId);

        res.render("messages", {
            messages,
            otherUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar los mensajes.");
    }
};

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.session.user.id;
        const recipientId = Number(req.body.recipient_id);
        const mensaje = req.body.mensaje?.trim();

        if (
            !Number.isInteger(recipientId) ||
            recipientId <= 0 ||
            recipientId === senderId ||
            !mensaje ||
            mensaje.length > 1000
        ) {
            return res.status(400).send("El mensaje o destinatario no es válido.");
        }

        const recipient = await findUserById(recipientId);

        if (!recipient) {
            return res.status(404).send("Destinatario no encontrado.");
        }

        await createPrivateMessage(senderId, recipientId, mensaje);
        res.redirect(`/messages?user_id=${recipientId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("No se pudo enviar el mensaje.");
    }
};
