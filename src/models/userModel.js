import User from "../sequelizeModels/User.js";

export const createUser = async (nombre, email, password) => {
    return await User.create({
        nombre,
        email,
        password
    });
};

export const findUserByEmail = async (email) => {
    const user = await User.findOne({
        where: { email }
    });

    return {
        rows: user ? [user.get({ plain: true })] : []
    };
};