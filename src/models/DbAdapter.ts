import { Pool } from 'pg';
import { ApiError } from '@models/index';

export default class DbAdapter<T> {
	db: Pool;

	constructor(db: Pool) {
		this.db = db;
	}

	async createEntry(
		tableName: string,
		keysStr: string,
		values: (string | number | bigint | boolean)[],
	): Promise<T> {
		const sql = `
        insert into public.${tableName} (${keysStr})
        values ('${values.join(`', '`)}')
        returning *
    `;

		try {
			const res = await this.db.query(sql);
			return res.rows[0];
		} catch (err) {
			throw ApiError.unexpectedError();
		}
	}

	async createEntries(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter create';
	}

	async readEntry(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter read';
	}

	async readEntries(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter read';
	}

	async updateEntry(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter update';
	}

	async updateEntries(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter update';
	}

	async deleteEntry(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter delete';
	}

	async deleteEntries(tableName: string, items: T[] | T): Promise<any> {
		return 'DbAdapter delete';
	}
}
