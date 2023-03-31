import { MedicationsRepository, UsersRepository } from '@modules/index';

export interface IRepositories {
	users: UsersRepository;
	medications: MedicationsRepository;
}
