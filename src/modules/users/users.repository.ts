import { DataBaseClient, Repository, User } from '@models/index';

export default class UsersRepository extends Repository<User> {
	constructor(dbClient: DataBaseClient, entityName: string) {
		super(dbClient, entityName);
	}

	async addUser(user: User): Promise<void> {
		this.addOne(user);
	}

	async getUserById(id: string): Promise<User> {
		return this.getOne(id);
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		const users = this.getAll();

		return users.find((user) => user.email === email);
	}

	async getUserByUsername(username: string): Promise<User | undefined> {
		const users = this.getAll();

		return users.find((user) => user.username === username);
	}

	async deleteUser(id: string): Promise<void> {
		return this.deleteOne(id);
	}
}
