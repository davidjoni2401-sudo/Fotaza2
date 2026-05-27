import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const PostReport = sequelize.define("PostReport", {
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
    tableName: "post_reports",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "post_id"]
        }
    ]
});

export default PostReport;