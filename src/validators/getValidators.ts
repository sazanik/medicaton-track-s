import { ValidationChain } from 'express-validator';
import { FieldsType, ValidatorsObjectType } from './types';

export default (validatorsObject: ValidatorsObjectType, ...fields: FieldsType): ValidationChain[] =>
	fields.map((field) => validatorsObject[field]);
