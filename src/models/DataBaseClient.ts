import fs from 'fs';
import path from 'path';

type Data = Record<string, unknown>;

export interface IDataBaseClient {
	setData: (data: Data) => void;
	getData: () => Data;
}

export default class DataBaseClient implements IDataBaseClient {
	private readonly initialData: Record<string, unknown>;
	private readonly dbPath: string;

	constructor(initData = {}) {
		this.initialData = initData;
		this.dbPath = path.join(__dirname, '..', 'db.json');

		this.setDefaultData();
	}

	private setDefaultData(): void {
		const isDbExist = fs.existsSync(this.dbPath);

		if (!isDbExist) {
			this.setData(this.initialData);

			return;
		}

		const data = this.getData();

		if (data) {
			return;
		}

		this.setData(this.initialData);
	}

	getData(): Data {
		const data = fs.readFileSync(this.dbPath, 'utf-8');

		if (!data) {
			this.setData(this.initialData);
		}

		return JSON.parse(data);
	}

	setData(data: Data): void {
		fs.writeFileSync(this.dbPath, JSON.stringify(data));
	}
}
