import { randomUUID } from 'crypto';

const version = process.env.npm_package_version;

export enum UserKeys {
	id = 'id',
	email = 'email',
	username = 'username',
	usernameOrEmail = 'usernameOrEmail',
	password = 'password',
	firstName = 'firstName',
	lastName = 'lastName',
	medicationsIds = 'medicationsIds',
	authorization = 'authorization',
	deviceId = 'deviceId',
	browserId = 'browserId',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
	createdBy = 'createdBy',
	updatedBy = 'updatedBy',
	version = 'version',
}

export interface IUserLoginRequestBody {
	[UserKeys.usernameOrEmail]: string;
	[UserKeys.password]: string;
	[UserKeys.deviceId]: string;
	[UserKeys.browserId]: string;
}

export interface IUserRegisterRequestBody {
	[UserKeys.firstName]: string;
	[UserKeys.lastName]: string;
	[UserKeys.username]: string;
	[UserKeys.email]: string;
	[UserKeys.password]: string;
	[UserKeys.deviceId]: string;
	[UserKeys.browserId]: string;
}

export default class User {
	[UserKeys.id]: string;
	[UserKeys.firstName]: string;
	[UserKeys.lastName]: string;
	[UserKeys.username]: string;
	[UserKeys.email]: string;
	[UserKeys.password]: string;
	[UserKeys.createdBy]: string;
	[UserKeys.updatedBy]: string;
	[UserKeys.createdAt]: number;
	[UserKeys.updatedAt]: number;
	[UserKeys.version]: string;

	constructor({ firstName, lastName, username, email, password }: IUserRegisterRequestBody) {
		const id = randomUUID();

		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.createdBy = id;
		this.updatedBy = id;
		this.createdAt = Date.now();
		this.updatedAt = Date.now();
		this.version = version || '1.0.0';
	}
}
