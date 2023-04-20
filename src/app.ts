import express, { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { IApiError, IRepositories, IServices, UserKeys } from '@models/index';
import {
	AuthController,
	AuthService,
	MedicationsController,
	MedicationsRepository,
	MedicationsService,
	TokensRepository,
	UsersController,
	UsersRepository,
	UsersService,
} from '@modules/index';
import { Pool } from 'pg';

import { dbConfig } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = new Pool(dbConfig);

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const repositories: IRepositories = {
	users: new UsersRepository(db, 'user_account', [
		UserKeys.id,
		UserKeys.firstName,
		UserKeys.lastName,
		UserKeys.username,
		UserKeys.password,
		UserKeys.createdBy,
		UserKeys.updatedBy,
		UserKeys.createdAt,
		UserKeys.updatedAt,
		UserKeys.version,
	]),
	medications: new MedicationsRepository(db, 'medications', ['id']),
	tokens: new TokensRepository(db, 'tokens', ['id']),
};

const services: IServices = {
	auth: new AuthService(repositories),
	medications: new MedicationsService(repositories),
	users: new UsersService(repositories),
};

const router = Router();

router.use(new AuthController(services).getRouter());
router.use(new UsersController(services).getRouter());
router.use(new MedicationsController(services).getRouter());

app.use(router);
app.use('*', (err: IApiError, _req: Request, res: Response, _next: NextFunction) => {
	res.status(err.statusCode || 500).json(err);
});
