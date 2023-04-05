import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { ApiError, IUserLoginRequestBody, Service, User } from '@models/index';

const secretKey = process.env.JWT_ACCESS_SECRET_KEY || 'dev-secret-key';

interface IResponseData {
	firstName: string;
	lastName: string;
	token: string;
}

export default class AuthService extends Service {
	async register(user: User): Promise<IResponseData> {
		const token = sign({ id: user.id }, secretKey, { expiresIn: '10m' });

		return { token, firstName: user.firstName, lastName: user.lastName };
	}

	async login(data: IUserLoginRequestBody): Promise<IResponseData> {
		const promises = Promise.all([
			this.repositories.users.readByUsername(data.usernameOrEmail),
			this.repositories.users.readByEmail(data.usernameOrEmail),
		]);

		const existingUser = (await promises).find(Boolean);

		if (!existingUser) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const isCorrectPassword = compareSync(data.password, existingUser.password);

		if (!isCorrectPassword) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const token = sign({ id: existingUser.id }, secretKey, { expiresIn: '10m' });

		return { token, firstName: existingUser.firstName, lastName: existingUser.lastName };
	}

	async autologin(token: string): Promise<IResponseData> {
		let user;
		const jwtData = await verify(token, secretKey);

		if (typeof jwtData === 'object') {
			user = await this.repositories.users.readById(jwtData.id);
		} else {
			user = await this.repositories.users.readById(jwtData);
		}

		return { token, firstName: user.firstName, lastName: user.lastName };
	}
}
