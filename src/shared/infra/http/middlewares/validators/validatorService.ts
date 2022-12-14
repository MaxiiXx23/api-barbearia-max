import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorService = [
    check("name")
        .isLength({ min: 1, max: 20 })
        .withMessage("Name must to be between 1 to 20 caracters."),
    check("description")
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must to be between 1 to 100 caracters."),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];

export { validatorService };
