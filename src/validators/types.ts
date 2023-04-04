import { body, param, ValidationChain } from 'express-validator';
import { MedicationKeys, UserKeys } from '@models/index';

type FnResult = ReturnType<typeof body | typeof param>;
type FnParams = Parameters<typeof body | typeof param>;

export type ValidationType = (...params: FnParams) => FnResult;

export type ValidatorsObjectType = Record<string, ValidationChain>;

export type FieldsType = MedicationKeys[] | UserKeys[];
