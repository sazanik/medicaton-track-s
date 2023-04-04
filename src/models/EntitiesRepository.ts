import { IDataBaseClient } from '@models/index';

type EntityData<T> = Record<string, T>;

export interface IEntitiesRepository<T> {
	create: (name: string) => Promise<void>;
	read: (name: string) => Promise<EntityData<T>>;
	update: (name: string, id: string, item?: T) => Promise<void>;
	delete: (name: string) => Promise<void>;
	getAllNames: () => Promise<string[]>;
}

export default class EntitiesRepository<T> implements IEntitiesRepository<T> {
	dbClient: IDataBaseClient;

	constructor(dbClient: IDataBaseClient) {
		this.dbClient = dbClient;
	}

	async create(name: string): Promise<void> {
		const data = await this.dbClient.getData();

		data[name] = {};

		await this.dbClient.setData(data);
	}

	async read(name: string): Promise<EntityData<T>> {
		const data = await this.dbClient.getData();

		return data[name] as Promise<EntityData<T>>;
	}

	async update(name: string, id: string, item?: T): Promise<void> {
		const data = await this.dbClient.getData();
		const entityData = data[name] as EntityData<T>;

		if (!item) {
			delete entityData[id];
			await this.dbClient.setData(data);

			return;
		}

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
	}

	async delete(name: string): Promise<void> {
		const data = await this.dbClient.getData();

		delete data[name];

		await this.dbClient.setData(data);
	}

	async getAllNames(): Promise<string[]> {
		return Object.keys(await this.dbClient.getData());
	}
}
