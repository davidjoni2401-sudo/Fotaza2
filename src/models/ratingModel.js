import { fn, col } from "sequelize";
import { Rating } from "../sequelizeModels/index.js";
import { Col, Fn } from "sequelize/lib/utils";

export const createRating = async (user_id, post_id, valor) => {
    return await Rating.create({
        user_id,
        post_id,
        valor
    });
};

export const getRatingByPost = async (post_id) => {
    const reslut = await Rating.findOne({
        where: { post_id },
        attributes: [
            [fn("COALESCE", fn("ROUND", fn("AVG", col("valor")), 1), 0), "promedio"],
            [fn("COUNT", col("id")), "cantidad"]
        ],
        raw: true
    });
    
    return {
        rows: [{
            promedio: reslut.promedio,
            cantidad: reslut.cantidad
        }]
    };
};