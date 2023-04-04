import { body, param, ValidationChain } from 'express-validator';
import { MedicationRequestBodyKeys } from '@models/Medication';
import { UserLoginRequestBodyKeys, UserRegisterRequestBodyKeys } from '@models/User';

type FnResult = ReturnType<typeof body | typeof param>;
type FnParams = Parameters<typeof body | typeof param>;

export type ValidationType = (...params: FnParams) => FnResult;

export type ValidatorsObjectType = Record<string, ValidationChain>;

export type FieldsType =
	| MedicationRequestBodyKeys[]
	| UserLoginRequestBodyKeys[]
	| UserRegisterRequestBodyKeys[];
