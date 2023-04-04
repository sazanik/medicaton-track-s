import { MedicationRequestBodyKeys } from '@models/Medication';
import { ValidatorsObjectType, ValidationType } from './types';

export const getMedicationValidatorsObject = (
	validation: ValidationType,
): ValidatorsObjectType => ({
	[MedicationRequestBodyKeys.id]: validation(MedicationRequestBodyKeys.id).isUUID(4),
	[MedicationRequestBodyKeys.userId]: validation(MedicationRequestBodyKeys.userId).isUUID(4),
	[MedicationRequestBodyKeys.title]: validation(MedicationRequestBodyKeys.title)
		.isString()
		.isLength({ min: 2, max: 50 }),
	[MedicationRequestBodyKeys.description]: validation(MedicationRequestBodyKeys.description)
		.optional()
		.isString()
		.isLength({
			min: 2,
			max: 500,
		}),
	[MedicationRequestBodyKeys.count]: validation(MedicationRequestBodyKeys.count)
		.isNumeric()
		.isLength({ min: 1, max: 4 }),
	[MedicationRequestBodyKeys.destinationCount]: validation(
		MedicationRequestBodyKeys.destinationCount,
	)
		.isNumeric()
		.isLength({
			min: 1,
			max: 4,
		}),
});
