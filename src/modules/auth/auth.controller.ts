import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import {
	ApiError,
	Controller,
	IServices,
	IUserLoginRequestBody,
	IUserRegisterRequestBody,
	UserKeys,
} from '@models/index';
import { getUsersValidatorsObject, getValidators } from '@validators';

export default class AuthController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.router.post(
			'/register',
			getValidators(
				getUsersValidatorsObject(body),
				UserKeys.email,
				UserKeys.username,
				UserKeys.firstName,
				UserKeys.lastName,
				UserKeys.password,
			),
			this.register,
		);
		this.router.post(
			'/login',
			getValidators(getUsersValidatorsObject(body), UserKeys.usernameOrEmail, UserKeys.password),
			this.login,
		);
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

			const user = await this.services.users.create(req.body);

			await this.services.auth.register(req.body);
			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	}

	async login(
		req: Request<{}, {}, IUserLoginRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Check the correctness entered data', errors.array()));
			}

			await this.services.auth.login(req.body);
			res.status(200).end('You are successfully authorized');
		} catch (err) {
			next(err);
		}
	}
}
