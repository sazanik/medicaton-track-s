import { ApiError, IMedicationRequestBody, Medication, Service } from '@models/index';

export default class MedicationsService extends Service {
	async create(data: IMedicationRequestBody): Promise<void> {
		const existingMedication = await this.repositories.medications.readByName(data.title);

		const existingUser = await this.repositories.users.read(data.userId);

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
		};

		await this.repositories.users.update(updatedUser);
		await this.repositories.medications.create(medication);
	}

	async read(userId: string, medicationId: string): Promise<Medication> {
		const [user, medication] = await Promise.all([
			this.repositories.users.read(userId),
			this.repositories.medications.read(medicationId),
		]);

		if (!(user && medication) || userId !== user.id || medicationId !== medication.id) {
			throw ApiError.notFound(`Medication not found, check requests params`);
		}

		return medication;
	}

	async readAll(userId: string): Promise<Medication[]> {
		return this.repositories.medications.readCollByUserId(userId);
	}

	async update(id: string, medicationData: IMedicationRequestBody): Promise<Medication> {
		const existingMedication = await this.repositories.medications.read(id);

		if (!existingMedication) {
			throw ApiError.notFound(`Medication not found, check requests params`);
		}

		return this.repositories.medications.update({ ...existingMedication, ...medicationData });
	}

	async delete(userId: string, medicationId: string): Promise<void> {
		const [user, medication] = await Promise.all([
			this.repositories.users.read(userId),
			this.repositories.medications.read(medicationId),
		]);

		if (!(user && medication) || userId !== user.id || medicationId !== medication.id) {
			throw ApiError.notFound(`Medication not found, check requests params`);
		}

		await this.repositories.medications.delete(medicationId);
	}
}
