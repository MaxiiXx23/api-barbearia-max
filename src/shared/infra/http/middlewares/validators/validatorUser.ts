import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorUser = [
    check("email").trim().isEmail().withMessage("E-mail invalid."),
    check("password")
        .trim()
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be between 8 and 16 characters."),
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password must not be empty.")
        .isLength({ max: 60 })
        .withMessage("Password must be larger than 60."),
    check("phone")
        .trim()
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone isn't valid."),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];

export { validatorUser };
