import { randomUUID } from 'crypto';

export enum MedicationRequestBodyKeys {
	id = 'id',
	userId = 'userId',
	title = 'title',
	description = 'description',
	count = 'count',
	destinationCount = 'destinationCount',
}

export interface IMedicationRequestBody {
	[MedicationRequestBodyKeys.userId]: string;
	[MedicationRequestBodyKeys.title]: string;
	[MedicationRequestBodyKeys.description]?: string;
	[MedicationRequestBodyKeys.count]: number;
	[MedicationRequestBodyKeys.destinationCount]: number;
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
