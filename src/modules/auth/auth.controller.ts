import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';

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
		this.refreshToken = this.refreshToken.bind(this);
		this.verifyAccessTokenMiddleware = this.verifyAccessTokenMiddleware.bind(this);

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

		this.router.get(
			'/refresh-token',
			getValidators(getUsersValidatorsObject(header), UserKeys.authorization),
			this.refreshToken,
		);

		this.router.use(
			getValidators(getUsersValidatorsObject(header), UserKeys.authorization),
			this.verifyAccessTokenMiddleware,
		);
	}

	async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);
			const token = req.headers.authorization?.split(' ').pop();

			if (!token || !errors.isEmpty()) {
				next(ApiError.unauthorized('Token is invalid, authenticate again'));
				return;
			}

			const tokenPayload = await this.services.auth.verifyToken(token, true);
			const tokens = await this.services.auth.generateTokens(tokenPayload);

			res.status(200).json(tokens);
		} catch (err) {
			next(err);
		}
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
			const data = await this.services.auth.register({ ...req.body, userId: user.id });

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

	async verifyAccessTokenMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);
			const token = req.headers.authorization?.split(' ').pop();

			if (!token || !errors.isEmpty()) {
				next(ApiError.unauthorized('Token is invalid, authenticate again'));
				return;
			}

			await this.services.auth.verifyToken(token);

			next();
		} catch (err) {
			next(err);
		}
	}
}
