import { check, validationResult } from 'express-validator';

const userValidationUpdate = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    check('role_id').not().isEmpty().withMessage('Rol is required')
, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export default userValidationUpdate;