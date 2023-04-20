import { Medication, Repository } from '@models/index';

export default class MedicationsRepository extends Repository<Medication> {
	async readByName(title: string): Promise<Medication | undefined> {
		const medications = await this.read();

		return medications.find((m) => m.title === title);
	}

	async readCollByUserId(userId: string): Promise<Medication[]> {
		const medications = await this.read();

		return medications.filter((m) => m.userId === userId);
	}
}
