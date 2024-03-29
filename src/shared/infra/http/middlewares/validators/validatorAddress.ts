import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validatorAddress = [
    check("cep").trim().isPostalCode("BR").withMessage("CEP is invalid."),
    check("public_place")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Public place is invalid."),
    check("number").trim().isInt().withMessage("Number is invalid."),
    check("complement")
        .trim()
        .isLength({ max: 10 })
        .withMessage("Complement is invalid."),
    check("city").trim().not().isEmpty().withMessage("City is invalid."),
    check("state").trim().isLength({ min: 2 }).withMessage("State is invalid."),
    check("country").trim().not().isEmpty().withMessage("Country is invalid."),
    check("reference")
        .isLength({ max: 50 })
        .withMessage("Reference is invalid."),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];

export { validatorAddress };
