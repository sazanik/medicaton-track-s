import { NextFunction, Request, Response } from 'express';

import { ApiError, Controller, IMedication, IServices } from '@models/index';

export default class MedicationsController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.create = this.create.bind(this);
		this.readAll = this.readAll.bind(this);

		this.router.post('/users/:id/medications', this.create);
		this.router.get('/users/:id/medications', this.readAll);
	}

	async create(
		req: Request<{}, {}, IMedication>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (!Object.values(req.body).every(Boolean)) {
			throw ApiError.badRequest('All required fields of the form must be filled');
		}

		try {
			await this.services.medications.create(req.body);
			res.status(201).end(`Medication ${req.body.title} is successfully created`);
		} catch (err) {
			next(err);
		}
	}

	async readAll(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		try {
			const medications = await this.services.medications.readAll(req.params.id);
			res.status(200).json(medications);
		} catch (err) {
			next(err);
		}
	}
}
