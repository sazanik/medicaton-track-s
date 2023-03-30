import { Medication, Repository } from '@models/index';

export default class MedicationRepository extends Repository<Medication> {
	async createMedication(medication: Medication): Promise<void> {
		await this.createOne(medication);
	}

	async readMedicationById(id: string): Promise<Medication> {
		return this.readOne(id);
	}

	async readMedicationByName(name: string): Promise<Medication | undefined> {
		const medications = await this.readAll();

		return medications.find((medication) => medication.name === name);
	}

	async updateMedication(medication: Medication): Promise<void> {
		await this.updateOne(medication);
	}

	async deleteMedication(id: string): Promise<void> {
		await this.deleteOne(id);
	}
}
