import { CustomError } from '../models';

export const handleError = (err: unknown): never => {
	if (err instanceof Error) {
		throw new Error(err.message);
	}

	if (err instanceof CustomError) {
		throw new CustomError(err);
	}

	if (typeof err === 'string') {
		throw new Error(err);
	}

	throw new Error('Unexpected error');
};
