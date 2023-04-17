import { randomUUID } from 'crypto';

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
	[UserKeys.medicationsIds]: string[];
	[UserKeys.createdBy]: null;
	[UserKeys.updatedBy]: null;
	[UserKeys.createdAt]: number;
	[UserKeys.updatedAt]: number;

	constructor({ firstName, lastName, username, email, password }: IUserRegisterRequestBody) {
		this.id = randomUUID();
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.medicationsIds = [];
		this.createdBy = null;
		this.updatedBy = null;
		this.createdAt = Date.now();
		this.updatedAt = Date.now();
	}
}
