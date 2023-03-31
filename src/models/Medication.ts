import { randomUUID } from 'crypto';

export interface IMedication {
	userId: string;
	title: string;
	description?: string;
	destinationCount: number;
}

export default class Medication implements IMedication {
	id: string;
	userId: string;
	title: string;
	description: string;
	currentCount: number;
	destinationCount: number;

	constructor({ userId, title, description, destinationCount }: IMedication) {
		this.id = randomUUID();
		this.userId = userId;
		this.title = title;
		this.description = description || '';
		this.currentCount = 0;
		this.destinationCount = destinationCount;
	}
}
