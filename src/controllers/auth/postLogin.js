import config from "../../config";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../database/model/User";
import { Op } from "sequelize";

export async function loginUser(req, res) {
    const { identifier, password } = req.body;
    const user = await User.findAll({
        where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
    });
    console.log(user[0].dataValues);
    const userData = user[0].dataValues;

    if (!userData) {
        res.status(400).json({ message: "Login failed" });
        return;
    }

    bcrypt.compare(password, userData.user_password, (error, bcryptRes) => {
        if (bcryptRes) {
            const token = generateAccessToken({
                id: userData.id,
                username: userData.username,
                email: userData.user_email,
                firstName: userData.first_name,
                lastName: userData.last_name,
                isAdmin: userData.is_admin,
            });
            const serverRes = {
                message: "Login successful",
                data: userData,
                jwt: token,
            };
            res.status(200).json(serverRes);
        } else {
            const serverRes = {
                message: "Login failed",
                error: "Invalid credential",
                data: error,
            };
            res.status(401).json(serverRes);
        }
    });
}

function generateAccessToken(userData) {
    return jsonwebtoken.sign(userData, config.jwtSecretToken, {
        expiresIn: "1d",
    });
}
