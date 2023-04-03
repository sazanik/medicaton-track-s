import { NextFunction, Request, Response } from 'express';

import { ApiError, Controller, IMedicationRequestBody, IServices } from '@models/index';

export default class MedicationsController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.create = this.create.bind(this);
		this.read = this.read.bind(this);
		this.readAll = this.readAll.bind(this);
		this.changeCount = this.changeCount.bind(this);

		this.router.post('/users/:userId/medications', this.create);
		this.router.get('/users/:userId/medications/:id', this.read);
		this.router.get('/users/:userId/medications', this.readAll);
		this.router.put('/users/:userId/medications/:id', this.changeCount);
	}

	async create(
		req: Request<{}, {}, IMedicationRequestBody>,
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

	async read(
		req: Request<{ userId: string; id: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const medication = await this.services.medications.read(req.params.userId, req.params.id);
			res.status(200).json(medication);
		} catch (err) {
			next(err);
		}
	}

	async readAll(
		req: Request<{ userId: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const medications = await this.services.medications.readAll(req.params.userId);
			res.status(200).json(medications);
		} catch (err) {
			next(err);
		}
	}

	async changeCount(
		req: Request<{ userId: string; id: string }, {}, IMedicationRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			await this.services.medications.update(req.params.id, req.body);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	}
}
