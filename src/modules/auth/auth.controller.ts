import { NextFunction, Request, Response } from 'express';
import { body, validationResult, header } from 'express-validator';

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
		this.autologin = this.autologin.bind(this);

		this.router.get(
			'/',
			getValidators(getUsersValidatorsObject(header), UserKeys.authorization),
			this.autologin,
		);

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
				return;
			}

			const user = await this.services.users.create(req.body);
			const data = await this.services.auth.register(user);

			res.status(201).json(data);
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
				return;
			}

			const data = await this.services.auth.login(req.body);

			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	async autologin(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Authorization data is missing or incorrect', errors.array()));
				return;
			}

			const token = req.headers.authorization?.split(' ').pop();

			if (!token) {
				next(ApiError.unauthorized('Token expired or not found, authentication again'));
				return;
			}

			const data = await this.services.auth.autologin(token);

			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}
}
