export const showCreatePost = (req, res) => {

    res.render("createPost");
};

export const createPost = async (req, res) => {

    try {

        const imagen = req.file.filename;

        const { descripcion } = req.body;

        console.log(imagen);
        console.log(descripcion);

        res.send("Post creado ✅");

    } catch(error) {

        console.log(error);

        res.send("Error creando post ❌");
    }
};