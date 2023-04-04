import { Medication, Repository } from '@models/index';

export default class MedicationsRepository extends Repository<Medication> {
	async create(medication: Medication): Promise<void> {
		await this.createOne(medication);
	}

	async readById(id: string): Promise<Medication> {
		return this.readOne(id);
	}

	async readByName(title: string): Promise<Medication | undefined> {
		const medications = await this.readAll();

		return medications.find((m) => m.title === title);
	}

	async readCollByUserId(userId: string): Promise<Medication[]> {
		const medications = await this.readAll();

		return medications.filter((m) => m.userId === userId);
	}

	async update(medication: Medication): Promise<Medication> {
		return this.updateOne(medication);
	}

	async delete(id: string): Promise<void> {
		await this.deleteOne(id);
	}
}
