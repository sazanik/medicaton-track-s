import { randomUUID } from 'crypto';

export interface IMedicationRequestBody {
	userId: string;
	title: string;
	description?: string;
	count: number;
	destinationCount: number;
}

export default class Medication {
	id: string;
	userId: string;
	title: string;
	description: string;
	count: number;
	destinationCount: number;

	constructor({ userId, title, description, count, destinationCount }: IMedicationRequestBody) {
		this.id = randomUUID();
		this.userId = userId;
		this.title = title;
		this.description = description || '';
		this.count = count || 0;
		this.destinationCount = destinationCount;
	}
}
