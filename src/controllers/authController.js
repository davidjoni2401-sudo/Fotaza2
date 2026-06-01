import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const showRegister = (req, res) => {
    res.render("register");
};


export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);


        await createUser(nombre, email, hashedPassword);


        res.send("Usuario registrado ✅");

    } catch (error) {
        console.log(error);

        if (error.code === "23505") {
            return res.send("Ese email ya esta registrado ❌");
        }
        res.send("Error al registarte como usuario ❌");
    }
};

export const showLogin = (req, res) => {
    res.render("login");
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const result = await findUserByEmail(email);
        if (result.rows.length === 0) {
            return res.send("Usuario no existe ❌");
        }
        const user = result.rows[0];

        if (user.estado === "inactivo") {
            return res.send("Tu cuenta fue desactivada por incumplimiento de las normas ❌");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) {
            return res.send("Contraseña incorrecta ❌");
        }

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            estado: user.estado
        };
        res.redirect("/posts/feed");

    } catch (error) {

        console.log(error);

        res.send("Error login ❌")
    }
}