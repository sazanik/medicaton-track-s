import { IDataBaseClient } from '@models/index';

type EntityData<T> = Record<string, T>;

interface Item {
	id: string;
}

export interface IEntitiesRepository<T> {
	createEntity: (name: string, items?: T[]) => Promise<void>;
	readEntity: (name: string) => Promise<EntityData<T>>;
	updateItem: (name: string, id: string, item: T) => Promise<T>;
	deleteItem: (name: string, id: string) => Promise<void>;
	deleteEntity: (name: string) => Promise<void>;
	getAllEntitiesNames: () => Promise<string[]>;
}

export default class EntitiesRepository<T extends Item> implements IEntitiesRepository<T> {
	dbClient: IDataBaseClient;

	constructor(dbClient: IDataBaseClient) {
		this.dbClient = dbClient;
	}

	async createEntity(name: string, items?: T[]): Promise<void> {
		const data = await this.dbClient.getData();

		data[name] = {};

		if (items?.length) {
			items.forEach((item) => {
				(data[name] as EntityData<T>)[item.id] = item;
			});
		}

		await this.dbClient.setData(data);
	}

	async readEntity(name: string): Promise<EntityData<T>> {
		const data = await this.dbClient.getData();

		return data[name] as Promise<EntityData<T>>;
	}

	async updateItem(name: string, id: string, item: T): Promise<T> {
		const data = await this.dbClient.getData();
		const entityData = data[name] as EntityData<T>;

		const newData = {
			...data,
			[name]: {
				...entityData,
				[id]: {
					...entityData[id],
					...item,
				},
			},
		};

		await this.dbClient.setData(newData);

		return item;
	}

	async deleteItem(name: string, id: string): Promise<void> {
		const data = await this.dbClient.getData();
		const entityData = data[name] as EntityData<T>;

		delete entityData[id];
		await this.dbClient.setData(data);
	}

	async deleteEntity(name: string): Promise<void> {
		const data = await this.dbClient.getData();

		delete data[name];
		await this.dbClient.setData(data);
	}

	async getAllEntitiesNames(): Promise<string[]> {
		return Object.keys(await this.dbClient.getData());
	}
}
