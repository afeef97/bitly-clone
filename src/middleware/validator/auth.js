import { body } from "express-validator";
import User from "../../database/model/User";
import { Op } from "sequelize";

export const registerValidator = [];

export const loginValidator = [
    body("identifier")
        .exists()
        .withMessage("Identifier is required")
        .custom(async function (value) {
            const user = await User.findOne({
                attributes: ["username", "email"],
                where: {
                    [Op.or]: [{ username: value }, { email: value }],
                },
            });
            if (!user) {
                throw new Error("User does not exist");
            }
        }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be more than 6 characters"),
];

export const emailValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async function (value) {
            const user = await User.findOne({
                attributes: ["email"],
                where: {
                    email: value,
                },
            });
            if (!user) {
                throw new Error("Email does not exist");
            }
        }),
];
