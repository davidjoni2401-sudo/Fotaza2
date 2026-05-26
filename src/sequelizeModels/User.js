import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.TEXT
    }
}, {
    tableName: "users",
    timestamps: false
});

export default User;