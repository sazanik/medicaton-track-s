import { randomUUID } from 'crypto';

export enum UserKeys {
	id = 'id',
	email = 'email',
	username = 'username',
	usernameOrEmail = 'usernameOrEmail',
	password = 'password',
	firstName = 'firstName',
	lastName = 'lastName',
}

export interface IUserLoginRequestBody {
	[UserKeys.usernameOrEmail]: string;
	[UserKeys.password]: string;
}

export interface IUserRegisterRequestBody {
	[UserKeys.firstName]: string;
	[UserKeys.lastName]: string;
	[UserKeys.username]: string;
	[UserKeys.email]: string;
	[UserKeys.password]: string;
}

export default class User {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	medicationsIds: string[];

	constructor({ firstName, lastName, username, email, password }: IUserRegisterRequestBody) {
		this.id = randomUUID();
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.medicationsIds = [];
	}
}
