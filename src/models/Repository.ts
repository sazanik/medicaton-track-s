import { Pool } from 'pg';

import { DbAdapter } from '@models/index';

interface IRepository<T> {
	create(param: T | T[]): Promise<T | T[]>;

	read(param?: string | string[]): Promise<T | T[]>;

	update(param: T | T[]): Promise<T | T[]>;

	delete(param: string | string[]): Promise<void>;
}

export default class Repository<T extends {}> implements IRepository<T> {
	private dbAdapter: DbAdapter<T>;
	private tableName: string;
	private columnsNames: string[];

	constructor(db: Pool, tableName: string, columnsNames: string[]) {
		this.dbAdapter = new DbAdapter<T>(db);
		this.tableName = tableName;
		this.columnsNames = columnsNames;
	}

	transformToEntry(obj: T): void {
		const keysStr = '';
		const valuesStr = '';

		Object.entries(obj).forEach((prop) => {
			const [key, value] = prop;
		});
	}

	create(item: T): Promise<T>;
	create(items: T[]): Promise<T | T[]>;
	async create(param: Parameters<IRepository<T>['create']>[0]): ReturnType<IRepository<T>['read']> {
		if (Array.isArray(param)) {
			return [] as T[];
		}

		return this.dbAdapter.createEntry(
			this.tableName,
			Object.keys(param).join(', '),
			Object.values(param),
		);
	}

	read(): Promise<T[]>;
	read(id: string): Promise<T>;
	read(ids: string[]): Promise<T[]>;
	async read(param?: Parameters<IRepository<T>['read']>[0]): ReturnType<IRepository<T>['read']> {
		if (Array.isArray(param)) {
			return [] as T[];
		}

		if (param === undefined) {
			return [] as T[];
		}

		return {} as T;
	}

	update(item: T): Promise<T>;
	update(items: T[]): Promise<T[]>;
	async update(
		param: Parameters<IRepository<T>['update']>[0],
	): ReturnType<IRepository<T>['update']> {
		if (Array.isArray(param)) {
			return [] as T[];
		}

		return {} as T;
	}

	delete(id: string): Promise<void>;
	delete(ids: string[]): Promise<void>;
	async delete(
		param?: Parameters<IRepository<T>['delete']>[0],
	): ReturnType<IRepository<T>['delete']> {
		console.log(param);
	}
}
