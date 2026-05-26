import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const CollectionPost = sequelize.define("CollectionPost", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    collection_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Collection_posts",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["collection_id", "post_id"]
        }
    ]
});

export default CollectionPost;