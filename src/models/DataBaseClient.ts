import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

type Data = Record<string, unknown>;

export interface IDataBaseClient {
	setData: (data: Data) => Promise<void>;
	getData: () => Promise<Data>;
}

export default class DataBaseClient implements IDataBaseClient {
	private readonly initialData: Data;
	private readonly dbPath: string;

	constructor(initData: Data) {
		this.initialData = initData;
		this.dbPath = path.join(__dirname, '..', 'db.json');

		this.setDefaultData().then();
	}

	private async setDefaultData(): Promise<void> {
		const isDbExist = fs.existsSync(this.dbPath);

		if (!isDbExist) {
			await this.setData(this.initialData);

			return;
		}

		const data = await this.getData();

		if (data) {
			return;
		}

		await this.setData(this.initialData);
	}

	async getData(): Promise<Data> {
		const data = await fsp.readFile(this.dbPath, 'utf-8');

		if (!data) {
			await this.setData(this.initialData);
		}

		const initializedData = await fsp.readFile(this.dbPath, 'utf-8');

		return JSON.parse(initializedData);
	}

	async setData(data: Data): Promise<void> {
		await fsp.writeFile(this.dbPath, JSON.stringify(data));
	}
}
