import { ApiError, IMedicationRequestBody, Medication, Service } from '@models/index';

export default class MedicationsService extends Service {
	async create(data: IMedicationRequestBody): Promise<void> {
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

	async read(userId: string, id: string): Promise<Medication> {
		const [user, medication] = await Promise.all([
			this.repositories.users.readById(userId),
			this.repositories.medications.readById(id),
		]);

		if (!(user && medication) || userId !== user.id || id !== medication.id) {
			throw ApiError.notFound(`Medication not found, check requests params`);
		}

		return medication;
	}

	async readAll(userId: string): Promise<Medication[]> {
		return this.repositories.medications.readCollByUserId(userId);
	}

	async update(id: string, medicationData: IMedicationRequestBody): Promise<void> {
		const existingMedication = await this.repositories.medications.readById(id);

		if (!existingMedication) {
			throw ApiError.notFound(`Medication not found, check requests params`);
		}

		await this.repositories.medications.update({ ...existingMedication, ...medicationData });
	}
}