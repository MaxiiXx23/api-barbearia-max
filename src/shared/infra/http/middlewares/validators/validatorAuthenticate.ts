import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorAuthenticate = [
    check("email").trim().isEmail().withMessage("E-mail invalid."),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];

export { validatorAuthenticate };
