import {
    createCollection,
    getCollectionByUser,
    addPostToCollection,
    getCollectionByUser
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
        const { nombre } = req.body;

        await createCollection(user_id, nombre);

        res.redirect("/collections");

    } catch (error) {
        console.log(error);
        res.send("Error al crear colección ❌");
    }
};

export const savePostInCollection = async (req, res) => {
    try {
        const { collection_id, post_id } = req.body;

        await addPostToCollection(collection_id, post_id);

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