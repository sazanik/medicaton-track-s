import { randomUUID } from 'crypto';

export interface IUserLogin {
	usernameOrEmail: string;
	password: string;
}

export interface IUserRegister {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export default class User implements IUserRegister {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	medicationsIds: string[];

	constructor({ firstName, lastName, username, email, password }: IUserRegister) {
		this.id = randomUUID();
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.medicationsIds = [];
	}
}
