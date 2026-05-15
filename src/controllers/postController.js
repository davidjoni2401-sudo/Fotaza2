import { createPostModel } from "../models/postModel.js";
import { getAllPosts } from "../models/postModel.js";
import { createComment, getCaommentsByPost } from "../models/commentModel.js";

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

        for (const post of posts) {

            const commentsResult =
                await getCaommentsByPost(post.id);

            post.commets = 
                commentsResult.rows;
        }

        console.log(posts);

        res.render("feed", { posts });

    }catch(error){

        console.log(error);

        res.send("Error al cargar Feed ❌")
    }
}

export const addComment = async (req, res) => {
    
    try {
        
        const { post_id, comentario } = req.body;

        const  user_id = 1;

        await createComment(
            user_id,
            post_id,
            comentario
        );

        res.rendirect("/posts/feed");

    } catch (error) {
        
        console.log(error);

        res.send("Error al comentar ❌")
    }
}