import { EntitiesRepository, IDataBaseClient, IEntitiesRepository } from '@models/index';

interface DefaultItem {
	id: string;
}

interface IRepository<T> {
	addOne: (item: T) => void;
	getOne: (id: string) => T;
	deleteOne: (id: string) => void;
	getAll: () => T[];
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

	addOne(item: T): void {
		this.entitiesRepository.update(this.entityName, item.id, item);
	}

	getOne(id: string): T {
		return this.entitiesRepository.read(this.entityName)[id];
	}

	deleteOne(id: string): void {
		this.entitiesRepository.update(this.entityName, id);
	}

	getAll(): T[] {
		return Object.values(this.entitiesRepository.read(this.entityName));
	}
}
