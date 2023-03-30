import { EntitiesRepository, IDataBaseClient, IEntitiesRepository } from '@models/index';

interface DefaultItem {
	id: string;
}

interface IRepository<T> {
	createOne: (item: T) => Promise<void>;
	readOne: (id: string) => Promise<T>;
	updateOne: (item: T) => Promise<void>;
	deleteOne: (id: string) => Promise<void>;
	readAll: () => Promise<T[]>;
}

export default class Repository<T extends DefaultItem> implements IRepository<T> {
	private dbClient: IDataBaseClient;
	private readonly entityName: string;
	private entitiesRepository: IEntitiesRepository<T>;

	constructor(dbClient: IDataBaseClient, entityName: string) {
		this.dbClient = dbClient;
		this.entityName = entityName;
		this.entitiesRepository = new EntitiesRepository<T>(dbClient);
	}

	async createOne(item: T): Promise<void> {
		await this.entitiesRepository.update(this.entityName, item.id, item);
	}

	async readOne(id: string): Promise<T> {
		const entity = await this.entitiesRepository.read(this.entityName);

		return entity[id];
	}

	async updateOne(item: T): Promise<void> {
		await this.entitiesRepository.update(this.entityName, item.id, item);
	}

	async deleteOne(id: string): Promise<void> {
		await this.entitiesRepository.update(this.entityName, id);
	}

	async readAll(): Promise<T[]> {
		const items = await this.entitiesRepository.read(this.entityName);

		return Object.values(items);
	}
}
