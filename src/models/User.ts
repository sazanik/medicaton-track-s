import { randomUUID } from 'crypto';

export interface IUserLoginRequestBody {
	usernameOrEmail: string;
	password: string;
}

export interface IUserRegisterRequestBody {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
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
