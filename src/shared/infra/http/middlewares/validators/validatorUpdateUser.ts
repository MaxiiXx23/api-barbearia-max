import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorUpdateUser = [
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Name must not be empty.")
        .isLength({ max: 60 })
        .withMessage("Name must be larger than 60."),
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

export { validatorUpdateUser };
