import { Medication, User } from './index';

export interface IDataBase {
	users: Record<string, User>;
	medications: Record<string, Medication>;
}
