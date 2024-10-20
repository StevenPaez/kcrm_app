import { check, validationResult } from 'express-validator';

const userValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    check('password').not().isEmpty().withMessage('Password is required')
, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export default userValidation;