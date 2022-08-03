import { NextFunction, Request, Response } from 'express';
import { body, validationResult, ValidationError, ValidationChain, Result } from 'express-validator';

export const expressValidator = (req: Request, res: Response, next: NextFunction): any => {
        const errors: Result<ValidationError> = validationResult(req);
        const messages: ValidationError[] = [];
        if (!errors.isEmpty()) {
                for (const i of errors.array()) {
                        messages.push(i);
                }
                return res.status(400).send({ message: 'Bad Request', data: errors, status: 400 });
        }
        next();
};

// post new admin validator
export const fundAccountValidator = (): ValidationChain[] => [
        body('customerId').notEmpty().withMessage('Customer id is required'),
        body('amount').notEmpty().isNumeric().withMessage('Amount is required'),
];
