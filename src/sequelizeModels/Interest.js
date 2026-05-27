import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Interest = sequelize.define("Interest", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.TEXT
    }
}, {
    tableName: "interests",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "post_id"]
        }
    ]
});

export default Interest;