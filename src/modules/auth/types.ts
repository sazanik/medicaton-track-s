import { Token } from '@models/index';

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IResponseData extends ITokens {
	firstName: string;
	lastName: string;
	accessToken: string;
	refreshToken: string;
}

export type Payload = Pick<Token, 'userId' | 'browserId' | 'deviceId'>;
