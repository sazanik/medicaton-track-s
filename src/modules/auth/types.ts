import { Token } from '@models/index';

export interface ITokensIds {
	accessTokenId: string;
	refreshTokenId: string;
}

export interface IResponseData extends ITokensIds {
	firstName: string;
	lastName: string;
	accessTokenId: string;
	refreshTokenId: string;
}

export type Payload = Pick<Token, 'userId' | 'browserId' | 'deviceId'>;
