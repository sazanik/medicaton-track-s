import { IRepositories } from '@models/Repositories';

export default class Service {
	repositories: IRepositories;

	constructor(repositories: IRepositories) {
		this.repositories = repositories;
	}
}
