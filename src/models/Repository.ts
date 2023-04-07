import { EntitiesRepository, IDataBaseClient, IEntitiesRepository } from '@models/index';

interface DefaultItem {
	id: string;
}

interface IRepository<T> {
	createOne: (item: T) => Promise<T>;
	readOne: (id: string) => Promise<T>;
	updateOne: (item: T) => Promise<T | void>;
	updateAll: (items: T[]) => Promise<void>;
	deleteOne: (id: string) => Promise<void>;
	deleteColl: (ids: string[]) => Promise<void>;
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

	async createOne(item: T): Promise<T> {
		return this.entitiesRepository.updateItem(this.entityName, item.id, item);
	}

	async readOne(id: string): Promise<T> {
		const entity = await this.entitiesRepository.readEntity(this.entityName);

		return entity[id];
	}

	async readAll(): Promise<T[]> {
		const items = await this.entitiesRepository.readEntity(this.entityName);

		return Object.values(items);
	}

	async updateOne(item: T): Promise<T> {
		return this.entitiesRepository.updateItem(this.entityName, item.id, item);
	}

	async updateAll(items: T[]): Promise<void> {
		return this.entitiesRepository.createEntity(this.entityName, items);
	}

	async deleteOne(id: string): Promise<void> {
		await this.entitiesRepository.deleteItem(this.entityName, id);
	}

	async deleteColl(ids: string[]): Promise<void> {
		await this.entitiesRepository.deleteItems(this.entityName, ids);
	}
}
