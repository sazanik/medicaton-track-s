import { randomUUID } from 'crypto';

export enum UserLoginRequestBodyKeys {
	usernameOrEmail = 'usernameOrEmail',
	password = 'password',
}

export interface IUserLoginRequestBody {
	[UserLoginRequestBodyKeys.usernameOrEmail]: string;
	[UserLoginRequestBodyKeys.password]: string;
}

export enum UserRegisterRequestBodyKeys {
	firstName = 'firstName',
	lastName = 'lastName',
	username = 'username',
	email = 'email',
	password = 'password',
}

export interface IUserRegisterRequestBody {
	[UserRegisterRequestBodyKeys.firstName]: string;
	[UserRegisterRequestBodyKeys.lastName]: string;
	[UserRegisterRequestBodyKeys.username]: string;
	[UserRegisterRequestBodyKeys.email]: string;
	[UserRegisterRequestBodyKeys.password]: string;
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
