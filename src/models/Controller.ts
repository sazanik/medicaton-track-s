import { Router } from 'express';

import { IServices } from '@models/index';

export default class Controller {
	router: Router;
	services: IServices;

	constructor(services: IServices) {
		this.router = Router();
		this.services = services;
	}

	getRouter(): Router {
		return this.router;
	}
}
