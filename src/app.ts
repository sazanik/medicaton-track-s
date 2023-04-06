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
	TokensRepository,
	UsersController,
	UsersRepository,
	UsersService,
} from '@modules/index';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbClient = new DataBaseClient({ users: {}, medications: {}, tokens: {} });

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const repositories: IRepositories = {
	users: new UsersRepository(dbClient, 'users'),
	medications: new MedicationsRepository(dbClient, 'medications'),
	tokens: new TokensRepository(dbClient, 'tokens'),
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
