import { createPostModel } from "../models/postModel.js";

export const showCreatePost = (req, res) => {

    res.render("createPost");
};

export const createPost = async (req, res) => {

    try {

        const imagen = req.file.filename;

        const { descripcion } = req.body;
        
        const user_id = 1;

        await createPostModel(
            user_id,
            imagen,
            descripcion
        );

        res.send("Post guardado en DB ✅");

    } catch(error) {

        console.log(error);

        res.send("Error creando post ❌");
    }
};