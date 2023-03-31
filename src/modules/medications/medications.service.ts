import { ApiError, IMedication, Medication, Service } from '@models/index';

export default class MedicationsService extends Service {
	async create(data: IMedication): Promise<void> {
		const existingMedication = await this.repositories.medications.readByName(data.title);

		const existingUser = await this.repositories.users.readById(data.userId);

		// TODO: find out the correct naming of the error
		if (!existingUser) {
			throw ApiError.unexpectedError();
		}

		if (existingMedication) {
			throw ApiError.badRequest(`Medication with title ${existingMedication.title} already exists`);
		}

		const medication = new Medication(data);
		const updatedUser = {
			...existingUser,
			medicationsIds: [...existingUser.medicationsIds, medication.id],
		};

		await this.repositories.users.update(updatedUser);
		await this.repositories.medications.create(medication);
	}

	async readAll(userId: string): Promise<Medication[]> {
		return this.repositories.medications.readByUserId(userId);
	}
}
