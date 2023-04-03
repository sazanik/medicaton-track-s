import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import {
	ApiError,
	Controller,
	IServices,
	IUserLoginRequestBody,
	IUserRegisterRequestBody,
} from '@models/index';
import { loginValidator, registerValidator } from '@validators';

export default class AuthController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.router.post('/register', registerValidator, this.register);
		this.router.post('/login', loginValidator, this.login);
	}

	async register(
		req: Request<{}, {}, IUserRegisterRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Check the correctness entered data', errors.array()));
			}

			await this.services.auth.register(req.body);
			res.status(201).end(`User ${req.body.username} is successfully created`);
		} catch (err) {
			next(err);
		}
	}

	async login(
		req: Request<{}, {}, IUserLoginRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (!Object.values(req.body).every(Boolean)) {
			throw ApiError.badRequest('All required fields of the form must be filled');
		}

		try {
			await this.services.auth.login(req.body);
			res.status(200).end('You are successfully authorized');
		} catch (err) {
			next(err);
		}
	}
}
