import { body } from "express-validator";
import User from "../../database/model/User";
import { Op } from "sequelize";

export const registerValidator = [
    body("password")
        .exists()
        .withMessage("Password is required")
        .isStrongPassword()
        .withMessage(
            "Your passwords need to have 8 characters minimum with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
        ),
    body("username")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 5 })
        .withMessage("Username needs to be at least 5 characters")
        .isAlphanumeric("en-US")
        .withMessage("Username must be alphanumeric (a-z, A-Z, 1-9)"),
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
];

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
