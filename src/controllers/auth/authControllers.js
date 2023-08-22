import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import User from "../../database/model/User";
import generateAccessToken from "../../utils/helper/generateAccessToken";
import hashPassword from "../../utils/helper/hashPassword";

export async function loginUser(req, res) {
    const { identifier, password } = req.body;
    const user = await User.findAll({
        where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
    });
    const userData = user[0]?.dataValues;

    if (!userData) {
        res.status(400).json({ message: "Login failed" });
        return;
    }

    bcrypt.compare(password, userData.password, (error, bcryptRes) => {
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

export function registerUser(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    User.create({ username, email, password: hashedPassword })
        .then((user) => {
            return res.status(200).json({
                message: "Registration successful",
            });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "An error occured", data: err });
        });
}
