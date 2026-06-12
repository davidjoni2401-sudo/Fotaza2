import {
    createCollection,
    getCollectionsByUser,
    addPostToCollection,
    getPostsByCollection
} from "../models/collectionModel.js";

export const showCollections = async (req, res) => {
    try {
        const user_id = req.session.user.id;

        const result = await getCollectionsByUser(user_id);

        res.render("collections", {
            collections: result.rows
        });

    } catch (error) {
        console.log(error);
        res.send("Error al cargar colecciones ❌");
    }
};

export const storeCollection = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const nombre = req.body.nombre?.trim();

        if (!nombre || nombre.length > 100) {
            return res.status(400).send("El nombre de la colección es inválido.");
        }

        await createCollection(user_id, nombre);

        res.redirect("/collections");

    } catch (error) {
        console.log(error);
        res.send("Error al crear colección ❌");
    }
};

export const savePostInCollection = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { collection_id, post_id } = req.body;

        await addPostToCollection(collection_id, post_id, user_id);

        res.redirect("/posts/feed");

    } catch (error) {
        console.log(error);
        res.redirect("/posts/feed");
    }
};

export const showCollectionPosts = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { id } = req.params;

        const result = await getPostsByCollection(id, user_id);

        res.render("collectionPosts", {
            posts: result.rows
        });

    } catch (error) {
        console.log(error);
        res.send("Error al cargar publicaciones de la colección ❌");
    }
};
