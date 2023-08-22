import { body } from "express-validator";
import User from "../../database/model/User";
import { Op } from "sequelize";

export const registerValidator = [
    body("username")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 5 })
        .withMessage("Username needs to be at least 5 characters")
        .matches(/^[A-Za-z0-9 _.]+$/)
        .withMessage(
            "Username must not include special characters except _ or ."
        ),
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isStrongPassword()
        .withMessage(
            "Your passwords need to have 8 characters minimum with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
        ),
];

export const loginValidator = [
    body("identifier").exists().withMessage("Identifier is required"),
    // .custom(async function (value) {
    //     const user = await User.findOne({
    //         attributes: ["username", "email"],
    //         where: {
    //             [Op.or]: [{ username: value }, { email: value }],
    //         },
    //     });
    //     if (!user) {
    //         throw new Error("User does not exist");
    //     }
    // }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be more than 6 characters"),
];
