import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

import {
	ApiError,
	Controller,
	IMedicationRequestBody,
	IServices,
	MedicationKeys,
} from '@models/index';
import { getMedicationValidatorsObject, getValidators } from '@validators';

export default class MedicationsController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.create = this.create.bind(this);
		this.read = this.read.bind(this);
		this.readAll = this.readAll.bind(this);
		this.updateCount = this.updateCount.bind(this);
		this.delete = this.delete.bind(this);

		this.router.post(
			'/users/:userId/medications',
			getValidators(
				getMedicationValidatorsObject(body),
				MedicationKeys.userId,
				MedicationKeys.title,
				MedicationKeys.description,
				MedicationKeys.destinationCount,
			),
			this.create,
		);
		this.router.get(
			'/users/:userId/medications/:id',
			getValidators(getMedicationValidatorsObject(param), MedicationKeys.userId, MedicationKeys.id),
			this.read,
		);
		this.router.get(
			'/users/:userId/medications',
			getValidators(getMedicationValidatorsObject(param), MedicationKeys.userId),
			this.readAll,
		);
		this.router.put(
			'/users/:userId/medications/:id',
			getValidators(getMedicationValidatorsObject(param), MedicationKeys.userId, MedicationKeys.id),
			getValidators(getMedicationValidatorsObject(body), MedicationKeys.count),
			this.updateCount,
		);
		this.router.delete(
			'/users/:userId/medications/:id',
			getValidators(getMedicationValidatorsObject(param), MedicationKeys.id),
			this.delete,
		);
	}

	async create(
		req: Request<{}, {}, IMedicationRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Check the correctness entered data', errors.array()));
				return;
			}

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
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Incorrect request params', errors.array()));
				return;
			}

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
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Incorrect request params', errors.array()));
				return;
			}

			const medications = await this.services.medications.readAll(req.params.userId);

			res.status(200).json(medications);
		} catch (err) {
			next(err);
		}
	}

	async updateCount(
		req: Request<{ userId: string; id: string }, {}, IMedicationRequestBody>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Incorrect request params or body', errors.array()));
			}

			const medication = await this.services.medications.update(req.params.id, req.body);

			res.status(200).json(medication);
		} catch (err) {
			next(err);
		}
	}

	async delete(
		req: Request<{ userId: string; id: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('Incorrect request params', errors.array()));
				return;
			}

			await this.services.medications.delete(req.params.userId, req.params.id);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	}
}
