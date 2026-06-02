import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const CommentReport = sequelize.define("CommentReport", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    created_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: "comment_reports",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "comment_id"]
        }
    ]
});

export default CommentReport;
