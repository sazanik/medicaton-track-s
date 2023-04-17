import path from 'path';
import { migrate } from 'postgres-migrations';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

const client = new Client(config);

export const launchDb = async (): Promise<void> => {
	try {
		await client.connect();
		await migrate({ client }, path.join(__dirname, './migrations'));
	} catch (err) {
		console.log(err);
	} finally {
		await client.end();
	}
};
