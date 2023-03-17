import { randomUUID } from 'crypto';

export interface IMedication {
	userId: string;
	name: string;
	description?: string;
	count: number;
	destinationCount: number;
}

export default class Medication implements IMedication {
	id: string;
	userId: string;
	name: string;
	description: string;
	count: number;
	destinationCount: number;

	constructor({ userId, name, description, count, destinationCount }: IMedication) {
		this.id = randomUUID();
		this.userId = userId;
		this.name = name;
		this.description = description || '';
		this.count = count;
		this.destinationCount = destinationCount;
	}
}
