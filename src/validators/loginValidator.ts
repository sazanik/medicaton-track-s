import { body, ValidationChain, check } from 'express-validator';

export default ((): ValidationChain[] => [
	body('usernameOrEmail').isString().isLength({ min: 2, max: 50 }),
	body('password').isStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}),
])();
