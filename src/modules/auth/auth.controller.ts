import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import {
	ApiError,
	Controller,
	IServices,
	IUserLoginRequestBody,
	IUserRegisterRequestBody,
	UserLoginRequestBodyKeys,
	UserRegisterRequestBodyKeys,
} from '@models/index';
import { getAuthValidatorsObject, getValidators } from '@validators';

export default class AuthController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.router.post(
			'/register',
			getValidators(
				getAuthValidatorsObject(body),
				UserRegisterRequestBodyKeys.email,
				UserRegisterRequestBodyKeys.username,
				UserRegisterRequestBodyKeys.firstName,
				UserRegisterRequestBodyKeys.lastName,
				UserRegisterRequestBodyKeys.password,
			),
			this.register,
		);
		this.router.post(
			'/login',
			getValidators(
				getAuthValidatorsObject(body),
				UserLoginRequestBodyKeys.usernameOrEmail,
				UserLoginRequestBodyKeys.password,
			),
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
