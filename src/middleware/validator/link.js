import { body } from "express-validator";

export const createLinkValidator = [
    body("link")
        .exists()
        .withMessage("is required")
        .isURL()
        .withMessage("is invalid"),
];
