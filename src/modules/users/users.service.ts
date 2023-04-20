import { hash } from 'bcrypt';

import { ApiError, IUserRegisterRequestBody, Service, User } from '@models/index';

export default class UsersService extends Service {
	async create(data: IUserRegisterRequestBody): Promise<User> {
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

		const hashPassword = await hash(data.password, 10);
		const user = new User({ ...data, password: hashPassword });

		return this.repositories.users.create(user);
	}

	async readAll(): Promise<User[]> {
		return this.repositories.users.read();
	}

	async delete(id: string): Promise<void> {
		const existingUser = await this.repositories.users.read(id);

		if (!existingUser) {
			throw ApiError.notFound('Incorrect request params');
		}

		await this.repositories.users.delete(id);
	}
}
