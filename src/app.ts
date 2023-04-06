import express, { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { DataBaseClient, IApiError, IRepositories, IServices } from '@models/index';
import {
	AuthController,
	AuthService,
	MedicationsController,
	MedicationsRepository,
	MedicationsService,
	UsersController,
	UsersRepository,
	UsersService,
} from '@modules/index';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbClient = new DataBaseClient({ users: {}, medications: {} });

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const repositories: IRepositories = {
	users: new UsersRepository(dbClient, 'users'),
	medications: new MedicationsRepository(dbClient, 'medications'),
};

const services: IServices = {
	auth: new AuthService(repositories),
	medications: new MedicationsService(repositories),
	users: new UsersService(repositories),
};

const router = Router();

router.use(new AuthController(services).getRouter());
router.use(new MedicationsController(services).getRouter());
router.use(new UsersController(services).getRouter());

app.use(router);

app.use('*', (err: IApiError, _req: Request, res: Response, _next: NextFunction) => {
	console.log('ERRORS', err);
	res.status(err.statusCode || 500).send(err);
});
