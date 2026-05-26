import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Collection = sequelize.define("collection", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: "collections",
    timestamps: false
});

export default Collection;