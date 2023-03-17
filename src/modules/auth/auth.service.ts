import { ApiError, IRepositories, IUserLogin, IUserRegister, User } from '@models/index';

export default class AuthService {
	repositories: IRepositories;

	constructor(repositories: IRepositories) {
		this.repositories = repositories;
	}

	async register(data: IUserRegister): Promise<User> {
		const existingUserByUsername = await this.repositories.users.getUserByUsername(data.username);
		const existingUserByEmail = await this.repositories.users.getUserByEmail(data.email);

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

		await this.repositories.users.addUser(user);

		return user;
	}

	async login(data: IUserLogin): Promise<User | boolean> {
		const promises = Promise.all([
			await this.repositories.users.getUserByUsername(data.usernameOrEmail),
			await this.repositories.users.getUserByEmail(data.usernameOrEmail),
		]);

		const existingUser = (await promises).find(Boolean);

		if (!existingUser) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const isCorrectPassword = existingUser.password === data.password;

		if (!isCorrectPassword) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		return true;
	}
}
