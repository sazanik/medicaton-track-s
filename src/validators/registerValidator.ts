import { body, ValidationChain } from 'express-validator';

export default ((): ValidationChain[] => [
	body('email').isEmail(),
	body('firstName').isString().isLength({ min: 2, max: 50 }),
	body('lastName').isString().isLength({ min: 2, max: 50 }),
	body('username').isString().isLength({ min: 2, max: 50 }),
	body('password').isStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}),
])();
