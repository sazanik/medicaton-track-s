import { IDataBaseClient } from '@models/index';

type EntityData<T> = Record<string, T>;

export interface IEntitiesRepository<T> {
	create: (name: string) => void;
	read: (name: string) => EntityData<T>;
	update: (name: string, id: string, item?: T) => void;
	delete: (name: string) => void;
	getAllNames: () => string[];
}

export default class EntitiesRepository<T> implements IEntitiesRepository<T> {
	dbClient: IDataBaseClient;

	constructor(dbClient: IDataBaseClient) {
		this.dbClient = dbClient;
	}

	create(name: string): void {
		const data = this.dbClient.getData();

		data[name] = {};

		this.dbClient.setData(data);
	}

	read(name: string): EntityData<T> {
		const data = this.dbClient.getData();

		return data[name] as EntityData<T>;
	}

	update(name: string, id: string, item?: T): void {
		const data = this.dbClient.getData();
		const entityData = this.dbClient.getData()[name] as EntityData<T>;

		if (!item) {
			delete entityData[id];
		}

		const newData = {
			...data,
			[name]: {
				...entityData,
				[id]: {
					...entityData[id],
					item,
				},
			},
		};

		this.dbClient.setData(newData);
	}

	delete(name: string): void {
		const data = this.dbClient.getData();

		delete data[name];

		this.dbClient.setData(data);
	}

	getAllNames(): string[] {
		return Object.keys(this.dbClient.getData());
	}
}
