import { MedicationKeys } from '@models/Medication';
import { ValidatorsObjectType, ValidationType } from './types';

export const getMedicationValidatorsObject = (
	validation: ValidationType,
): ValidatorsObjectType => ({
	[MedicationKeys.id]: validation(MedicationKeys.id).isUUID(4),
	[MedicationKeys.userId]: validation(MedicationKeys.userId).isUUID(4),
	[MedicationKeys.title]: validation(MedicationKeys.title).isString().isLength({ min: 2, max: 50 }),
	[MedicationKeys.description]: validation(MedicationKeys.description)
		.optional()
		.isString()
		.isLength({
			min: 2,
			max: 500,
		}),
	[MedicationKeys.count]: validation(MedicationKeys.count).isNumeric().isLength({ min: 1, max: 4 }),
	[MedicationKeys.destinationCount]: validation(MedicationKeys.destinationCount)
		.isNumeric()
		.isLength({
			min: 1,
			max: 4,
		}),
});
