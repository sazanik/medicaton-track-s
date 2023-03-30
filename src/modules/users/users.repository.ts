import { Repository, User } from '@models/index';

export default class UsersRepository extends Repository<User> {
	async createUser(user: User): Promise<void> {
		await this.createOne(user);
	}

	async readUserById(id: string): Promise<User> {
		return this.readOne(id);
	}

	async readUserByEmail(email: string): Promise<User | undefined> {
		const users = await this.readAll();

		return users.find((user) => user.email === email);
	}

	async readUserByUsername(username: string): Promise<User | undefined> {
		const users = await this.readAll();

		return users.find((user) => user.username === username);
	}

	async deleteUser(id: string): Promise<void> {
		await this.deleteOne(id);
	}
}
