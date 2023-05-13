const version = process.env.npm_package_version  || '1.0.0';

export enum TokenKeys {
	id = 'id',
	userId = 'userId',
	deviceId = 'deviceId',
	browserId = 'browserId',
	type = 'type',
	expiresIn = 'expiresIn',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
	createdBy = 'createdBy',
	updatedBy = 'updatedBy',
	version = 'version',
}

export interface ITokenCreateRequest {
	[TokenKeys.id]: string;
	[TokenKeys.userId]: string;
	[TokenKeys.deviceId]: string;
	[TokenKeys.browserId]: string;
	[TokenKeys.type]: 'access' | 'refresh';
	[TokenKeys.expiresIn]: number;
}

export default class Token {
	[TokenKeys.id]: string;
	[TokenKeys.userId]: string;
	[TokenKeys.deviceId]: string;
	[TokenKeys.browserId]: string;
	[TokenKeys.type]: 'access' | 'refresh';
	[TokenKeys.expiresIn]: number;
	[TokenKeys.createdBy]: string;
	[TokenKeys.updatedBy]: string;
	[TokenKeys.createdAt]: number;
	[TokenKeys.updatedAt]: number;
	[TokenKeys.version]: string;

	constructor({ id, userId, deviceId, browserId, type, expiresIn }: ITokenCreateRequest) {
		this.id = id;
		this.userId = userId;
		this.deviceId = deviceId;
		this.browserId = browserId;
		this.type = type;
		this.expiresIn = expiresIn;
		this.createdBy = userId;
		this.updatedBy = userId;
		this.createdAt = Date.now();
		this.updatedAt = Date.now();
		this.version = version;
	}
}
