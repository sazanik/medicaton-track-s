export enum TokenKeys {
	id = 'id',
	userId = 'userId',
	deviceId = 'deviceId',
	browserId = 'browserId',
	type = 'type',
	expiresIn = 'expiresIn',
}

interface IToken {
	[TokenKeys.id]: string;
	[TokenKeys.userId]: string;
	[TokenKeys.deviceId]: string;
	[TokenKeys.browserId]: string;
	[TokenKeys.type]: 'access' | 'refresh';
	[TokenKeys.expiresIn]: number;
}

export default class Token {
	id: string;
	userId: string;
	deviceId: string;
	browserId: string;
	type: 'access' | 'refresh';
	expiresIn: number;

	constructor({ id, userId, deviceId, browserId, type, expiresIn }: IToken) {
		this.id = id;
		this.userId = userId;
		this.deviceId = deviceId;
		this.browserId = browserId;
		this.type = type;
		this.expiresIn = expiresIn;
	}
}
