import { Token, TokenKeys } from '@models/index';

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

export type Payload = Pick<Token, TokenKeys.userId | TokenKeys.browserId | TokenKeys.deviceId>;
