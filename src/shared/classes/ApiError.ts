export interface IApiError extends Error {
	name: string;
	message: string;
	stack?: string;
	statusCode?: number;
	errors?: string[];
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
	errors?: string[];

	constructor({ name, message, stack, statusCode, errors }: IApiError = defaultValues) {
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.statusCode = statusCode;
		this.errors = errors;
	}

	static badRequest(message: string): ApiError {
		return new ApiError({ message, name: 'Bad Request', statusCode: 400 });
	}

	static unauthorized(message: string): ApiError {
		return new ApiError({ message, name: 'Unauthorized', statusCode: 401 });
	}

	static notFound(message: string): ApiError {
		return new ApiError({ message, name: 'Not Found', statusCode: 404 });
	}

	static internalServerError(message: string): ApiError {
		return new ApiError({ message, name: 'Internal Server Error', statusCode: 500 });
	}

	static unexpectedError(): ApiError {
		return new ApiError(defaultValues);
	}
}
