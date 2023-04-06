import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

import { ApiError, Controller, IServices, IUserRegisterRequestBody, UserKeys } from '@models/index';
import { getUsersValidatorsObject, getValidators } from '@validators';

export default class UsersController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.create = this.create.bind(this);
		this.readAll = this.readAll.bind(this);
		this.delete = this.delete.bind(this);

		this.router.post(
			'/users',
			getValidators(
				getUsersValidatorsObject(body),
				UserKeys.email,
				UserKeys.username,
				UserKeys.firstName,
				UserKeys.lastName,
				UserKeys.password,
			),
			this.create,
		);

		this.router.get('/users', this.readAll);

		this.router.delete(
			'/users/:id',
			getValidators(getUsersValidatorsObject(param), UserKeys.id),
			this.delete,
		);
	}

	async create(
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

			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	}

	async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const users = await this.services.users.readAll();

			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Incorrect request params', errors.array()));
				return;
			}

			await this.services.users.delete(req.params.id);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	}
}
