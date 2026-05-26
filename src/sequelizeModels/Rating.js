import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Rating = sequelize.define("Rating", {
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
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    tableName: "ratings",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "post_id"]
        }
    ]
});

export default Rating;