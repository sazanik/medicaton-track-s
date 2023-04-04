import { UserKeys } from '@models/User';
import { ValidatorsObjectType, ValidationType } from './types';
import { MedicationKeys } from '@models/Medication';

export const getUsersValidatorsObject = (validation: ValidationType): ValidatorsObjectType => ({
	[UserKeys.id]: validation(MedicationKeys.id).isUUID(4),
	[UserKeys.email]: validation(UserKeys.email).isEmail(),
	[UserKeys.firstName]: validation(UserKeys.firstName).isString().isLength({
		min: 2,
		max: 50,
	}),
	[UserKeys.lastName]: validation(UserKeys.lastName).isString().isLength({
		min: 2,
		max: 50,
	}),
	[UserKeys.username]: validation(UserKeys.username).isString().isLength({
		min: 2,
		max: 50,
	}),
	[UserKeys.password]: validation(UserKeys.password).isStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}),
	[UserKeys.usernameOrEmail]: validation(UserKeys.usernameOrEmail).isString().isLength({
		min: 2,
		max: 50,
	}),
});
