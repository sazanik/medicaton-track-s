import {
	ApiError,
	IUserLoginRequestBody,
	IUserRegisterRequestBody,
	Service,
	User,
} from '@models/index';

export default class AuthService extends Service {
	async register(data: IUserRegisterRequestBody): Promise<void> {
		const existingUserByUsername = await this.repositories.users.readByUsername(data.username);
		const existingUserByEmail = await this.repositories.users.readByEmail(data.email);

		if (existingUserByUsername) {
			throw ApiError.badRequest(
				`User with username ${existingUserByUsername.username} already exists`,
			);
		}

		if (existingUserByEmail) {
			throw ApiError.badRequest(`User with email ${existingUserByEmail.email} already exists`);
		}

		// TODO: realize token logic authentication

		const user = new User(data);

		await this.repositories.users.create(user);
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
