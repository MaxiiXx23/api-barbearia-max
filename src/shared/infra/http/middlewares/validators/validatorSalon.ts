import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorSalon = [
    check("name")
        .isLength({ min: 1, max: 50 })
        .withMessage("Name must to be between 1 to 50 caracters."),
    check("slogan")
        .isLength({ min: 1, max: 60 })
        .withMessage("Slogan must to be between 1 to 50 caracters."),
    check("adress_id")
        .not()
        .isEmpty()
        .withMessage("adress_id must not be empty."),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];

export { validatorSalon };
