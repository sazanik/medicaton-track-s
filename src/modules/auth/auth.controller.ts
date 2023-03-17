import { NextFunction, Request, Response } from 'express';

import { ApiError, Controller, IServices, IUserLogin, IUserRegister } from '@models/index';

export default class AuthController extends Controller {
	services: IServices;

	constructor(services: IServices) {
		super(services);
		this.services = services;

		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.router.post('/register', this.register);
		this.router.post('/login', this.login);
	}

	async register(
		req: Request<{}, {}, IUserRegister>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (!Object.values(req.body).every(Boolean)) {
			throw ApiError.badRequest('All required fields of the form must be filled');
		}

		try {
			const user = await this.services.auth.register(req.body);
			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	}

	async login(req: Request<{}, {}, IUserLogin>, res: Response, next: NextFunction): Promise<void> {
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
