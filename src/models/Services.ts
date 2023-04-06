import { MedicationsService, AuthService, UsersService } from '@modules/index';

export interface IServices {
	auth: AuthService;
	medications: MedicationsService;
	users: UsersService;
}
