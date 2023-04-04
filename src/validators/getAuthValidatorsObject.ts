import { UserLoginRequestBodyKeys, UserRegisterRequestBodyKeys } from '@models/User'
import { ValidatorsObjectType, ValidationType } from './types'

export const getAuthValidatorsObject = (validation: ValidationType): ValidatorsObjectType => ({
	[UserRegisterRequestBodyKeys.email]: validation(UserRegisterRequestBodyKeys.email).isEmail(),
	[UserRegisterRequestBodyKeys.firstName]: validation(UserRegisterRequestBodyKeys.firstName)
		.isString()
		.isLength({
			min: 2,
			max: 50,
		}),
	[UserRegisterRequestBodyKeys.lastName]: validation(UserRegisterRequestBodyKeys.lastName)
		.isString()
		.isLength({
			min: 2,
			max: 50,
		}),
	[UserRegisterRequestBodyKeys.username]: validation(UserRegisterRequestBodyKeys.username)
		.isString()
		.isLength({
			min: 2,
			max: 50,
		}),
	[UserRegisterRequestBodyKeys.password]: validation(
		UserRegisterRequestBodyKeys.password,
	).isStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}),
	[UserLoginRequestBodyKeys.usernameOrEmail]: validation(UserLoginRequestBodyKeys.usernameOrEmail)
		.isString()
		.isLength({
			min: 2,
			max: 50,
		}),
})
