import { ApiError, IUserLoginRequestBody, IUserRegisterRequestBody, Service } from '@models/index';

export default class AuthService extends Service {
	async register(data: IUserRegisterRequestBody): Promise<void> {
		// TODO: realize token logic authentication
		console.log(data);
	}

	async login(data: IUserLoginRequestBody): Promise<void> {
		const promises = Promise.all([
			this.repositories.users.readByUsername(data.usernameOrEmail),
			this.repositories.users.readByEmail(data.usernameOrEmail),
		]);

		const existingUser = (await promises).find(Boolean);

		if (!existingUser) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const isCorrectPassword = existingUser.password === data.password;

		if (!isCorrectPassword) {
			throw ApiError.badRequest('Incorrect email or password');
		}
	}
}
