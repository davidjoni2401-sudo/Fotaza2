import { createPostModel } from "../models/postModel.js";
import { getAllPosts } from "../models/postModel.js";

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

export const showFeed = async (req, res) => {

    try{

        const result = await getAllPosts();

        const posts = result.rows;

        res.render("feed", { posts });

    }catch(error){

        console.log(error);

        res.send("Error al cargar Feed ❌")
    }
}