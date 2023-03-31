import { MedicationsService, AuthService } from '@modules/index';

export interface IServices {
	auth: AuthService;
	medications: MedicationsService;
}
