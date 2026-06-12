import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const showRegister = (req, res) => {
    res.render("register");
};

export const register = async (req, res) => {
    try {
        const nombre = req.body.nombre?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!nombre || nombre.length < 2 || nombre.length > 100) {
            return res.status(400).send("El nombre debe tener entre 2 y 100 caracteres.");
        }

        if (!email || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).send("Ingresá un email válido.");
        }

        if (typeof password !== "string" || password.length < 8 || password.length > 72) {
            return res.status(400).send("La contraseña debe tener entre 8 y 72 caracteres.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(nombre, email, hashedPassword);

        res.redirect("/login?registered=1");
    } catch (error) {
        console.log(error);

        if (error.code === "23505" || error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).send("Ese email ya está registrado.");
        }

        res.status(500).send("No se pudo completar el registro.");
    }
};

export const showLogin = (req, res) => {
    res.render("login", {
        registrationSuccess: req.query.registered === "1"
    });
};

export const login = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || typeof password !== "string") {
            return res.status(400).send("Credenciales inválidas.");
        }

        const result = await findUserByEmail(email);

        if (result.rows.length === 0) {
            return res.status(401).send("Credenciales inválidas.");
        }

        const user = result.rows[0];

        if (user.estado === "inactivo") {
            return res.status(403).send("Tu cuenta fue desactivada por incumplimiento de las normas.");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send("Credenciales inválidas.");
        }

        req.session.regenerate(error => {
            if (error) {
                return res.status(500).send("No se pudo iniciar sesión.");
            }

            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                estado: user.estado
            };

            res.redirect("/posts/feed");
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("No se pudo iniciar sesión.");
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("fotaza.sid");
        res.redirect("/login");
    });
};
