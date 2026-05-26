import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Follow = sequelize.define("Follow", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    following_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "followers",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["follower_id", "following_id"]
        }
    ]
});

export default Follow;