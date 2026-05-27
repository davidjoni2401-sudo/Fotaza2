import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(150)
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    etiquetas: {
        type: DataTypes.TEXT
    },
    licencia: {
        type: DataTypes.STRING(50),
        defaultValue: "sin copyright"
    },
    marca_agua: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.STRING(50),
        defaultValue: "activo"
    }
}, {
    tableName: "posts",
    timestamps: false
});

export default Post;