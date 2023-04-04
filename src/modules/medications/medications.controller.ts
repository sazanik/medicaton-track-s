import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

import {
	ApiError,
	Controller,
	IMedicationRequestBody,
	IServices,
	MedicationRequestBodyKeys,
} from '@models/index';
import { getMedicationValidatorsObject, getValidators } from '@validators';
import * as console from 'console';

export default class MedicationsController extends Controller {
	constructor(services: IServices) {
		super(services);

		this.create = this.create.bind(this);
		this.read = this.read.bind(this);
		this.readAll = this.readAll.bind(this);
		this.updateCount = this.updateCount.bind(this);

		this.router.post(
			'/users/:userId/medications',
			getValidators(
				getMedicationValidatorsObject(body),
				MedicationRequestBodyKeys.userId,
				MedicationRequestBodyKeys.title,
				MedicationRequestBodyKeys.description,
				MedicationRequestBodyKeys.destinationCount,
			),
			this.create,
		);
		this.router.get(
			'/users/:userId/medications/:id',
			getValidators(
				getMedicationValidatorsObject(param),
				MedicationRequestBodyKeys.userId,
				MedicationRequestBodyKeys.id,
			),
			this.read,
		);
		this.router.get(
			'/users/:userId/medications',
			getValidators(getMedicationValidatorsObject(param), MedicationRequestBodyKeys.userId),
			this.readAll,
		);
		this.router.put(
			'/users/:userId/medications/:id',
			getValidators(
				getMedicationValidatorsObject(param),
				MedicationRequestBodyKeys.userId,
				MedicationRequestBodyKeys.id,
			),
			getValidators(getMedicationValidatorsObject(body), MedicationRequestBodyKeys.count),
			this.updateCount,
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
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			next(ApiError.badRequest('Incorrect request data', errors.array()));
		}

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

	async updateCount(
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
