import { Repository, User } from '@models/index';

export default class UsersRepository extends Repository<User> {
	async readByEmail(email: string): Promise<User | undefined> {
		const users = await this.read();

		return users.find((u) => u.email === email);
	}

	async readByUsername(username: string): Promise<User | undefined> {
		const users = await this.read();

		return users.find((u) => u.username === username);
	}
}
