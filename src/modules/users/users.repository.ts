import { Repository, User } from '@models/index';

export default class UsersRepository extends Repository<User> {
	async create(user: User): Promise<User> {
		return this.createOne(user);
	}

	async readById(id: string): Promise<User> {
		return this.readOne(id);
	}

	async readByEmail(email: string): Promise<User | undefined> {
		const users = await this.readAll();

		return users.find((u) => u.email === email);
	}

	async readByUsername(username: string): Promise<User | undefined> {
		const users = await this.readAll();

		return users.find((u) => u.username === username);
	}

	async update(user: User): Promise<void> {
		await this.updateOne(user);
	}

	async delete(id: string): Promise<void> {
		await this.deleteOne(id);
	}
}
