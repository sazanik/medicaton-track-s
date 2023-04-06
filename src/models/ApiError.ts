import { ValidationError } from 'express-validator';

export interface IApiError extends Error {
	name: string;
	message: string;
	stack?: string;
	statusCode?: number;
	validationErrors?: ValidationError[];
}

const defaultValues = {
	name: 'Unexpected error',
	message: 'Try to make request later',
};

export default class ApiError implements IApiError {
	name: string;
	message: string;
	stack?: string;
	statusCode?: number;
	validationErrors?: ValidationError[];

	// TODO: figure out with default prop
	constructor({ name, message, stack, statusCode, validationErrors }: IApiError = defaultValues) {
		this.name = name;
		this.message = message;

		if (stack !== undefined) {
			this.stack = stack;
		}

		if (statusCode !== undefined) {
			this.statusCode = statusCode;
		}

		if (validationErrors !== undefined) {
			this.validationErrors = validationErrors;
		}
	}

	static badRequest(message: string, validationErrors?: ValidationError[]): ApiError {
		return new ApiError({ message, name: 'Bad Request', statusCode: 400, validationErrors });
	}

	static unauthorized(message: string, validationErrors?: ValidationError[]): ApiError {
		return new ApiError({ message, name: 'Unauthorized', statusCode: 401, validationErrors });
	}

	static notFound(message: string): ApiError {
		return new ApiError({ message, name: 'Not Found', statusCode: 404 });
	}

	static internalServerError(message = 'Please try submitting a request later'): ApiError {
		return new ApiError({ message, name: 'Internal Server Error', statusCode: 500 });
	}

	static unexpectedError(): ApiError {
		return new ApiError(defaultValues);
	}
}
