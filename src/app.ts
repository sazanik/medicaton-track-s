import express, { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { DataBaseClient, IApiError, IRepositories, IServices } from '@models/index';
import {
	AuthController,
	AuthService,
	MedicationsRepository,
	MedicationsService,
	UsersRepository,
} from '@modules/index';
import MedicationsController from '@modules/medications/medications.controller';

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
};

const router = Router();

router.use(new AuthController(services).getRouter());
router.use(new MedicationsController(services).getRouter());

app.use(router);

app.use('*', (err: IApiError, _req: Request, res: Response, _next: NextFunction) => {
	console.log('START++++++++++++');
	console.log(err);
	res.end('CATCH ERROR');
	console.log('--------------END');
});

/*app.post('/api/users', async (req: Request<{}, {}, IUserDto>, res: Response, next) => {
	const { name, password, email } = req.body;

	if (!name || !password || !email) {
		res.status(400);
		next();
		return;
	}

	const user = new User(req.body);

	try {
		await db.setUser(user);
		res.status(201).end(`User "${user.name}" is successfully created`);
	} catch (err) {
		if (err instanceof CustomError) {
			err.statusCode = 409;
		}

		next(err);
		return;
	}
});

app.get('/api/users/:id', async (req: Request<{ id: string }>, res) => {
	const { id } = req.params;

	try {
		const user = await db.getUserById(id);

		if (user) {
			res.status(200).json(user);
			return;
		}

		res.status(404).end(`User is not found`);
	} catch (err) {
		res.status(500).end(`Internal server error, try  again later`);
		throw Error((err as Error).message);
	}
});

app.use((req, res, next) => {
	return;
});

app.use((err: CustomError, _req: Request, res: Response, next: NextFunction) => {
	if (err.statusCode) {
		res.status(err.statusCode);
	}

	const renderedResponseMessage = `
		${err.name}
		${err.message}
	`;

	switch (err.statusCode) {
		case 409:
			res.send(err.message);
			break;

		case 404:
			res.render(`<h2>${renderedResponseMessage}</h2>`);
			break;

		case 400:
			res.end('Bad request, fill in all the fields.');

		default:
			next(new Error('Unexpected error'));
	}
});*/
