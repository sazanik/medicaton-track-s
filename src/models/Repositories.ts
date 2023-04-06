import { MedicationsRepository, TokensRepository, UsersRepository } from '@modules/index';

export interface IRepositories {
	users: UsersRepository;
	medications: MedicationsRepository;
	tokens: TokensRepository;
}
