import bcrypt from "bcrypt";
import { createUser } from "../models/userModel.js";


export const showRegister = (req, res) => {
    res.render("register");
};


export const register = async(req, res) => {
    try{
        const { nombre, email, password } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);  


        await createUser(nombre, email, password);


        res.sed("Usuario registrado ✅");

    }catch(error) {
        console.log(error);
        res.sed("Error al registarte como usuario ❌");
    }
};