import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const PostImage = sequelize.define("PostImage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: "post_images",
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ["post_id", "orden"]
    }]
});

export default PostImage;
