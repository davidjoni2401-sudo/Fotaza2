import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const PrivateMessage = sequelize.define("PrivateMessage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    leido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "private_messages",
    timestamps: false
});

export default PrivateMessage;
