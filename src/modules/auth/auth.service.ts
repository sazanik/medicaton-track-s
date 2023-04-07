import { compareSync } from 'bcrypt';
import { decode, JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

import {
	ApiError,
	IUserLoginRequestBody,
	IUserRegisterRequestBody,
	Service,
	Token,
} from '@models/index';
import { IResponseData, ITokensIds, Payload } from './types';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const accessTokenLifetime = process.env.ACCESS_TOKEN_LIFETIME || 60 * 60;

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
const refreshTokenLifetime = process.env.REFRESH_TOKEN_LIFETIME || 60 * 60 * 24;

export default class AuthService extends Service {
	async generateTokens(payload: Payload): Promise<ITokensIds> {
		const accessTokenId = sign(payload, accessTokenSecret, {
			expiresIn: accessTokenLifetime + 's',
		});

		const refreshTokenId = sign(payload, refreshTokenSecret, {
			expiresIn: refreshTokenLifetime + 's',
		});

		const {
			userId,
			deviceId,
			browserId,
			exp: accessExp,
		} = decode(accessTokenId) as Token & { exp: number };
		const { exp: refreshExp } = decode(refreshTokenId) as Token & { exp: number };

		const accessToken = new Token({
			id: accessTokenId,
			userId,
			browserId,
			deviceId,
			type: 'access',
			expiresIn: accessExp || Math.round(Date.now() / 1000) + Number(accessTokenLifetime),
		});

		const refreshToken = new Token({
			id: refreshTokenId,
			userId,
			browserId,
			deviceId,
			type: 'refresh',
			expiresIn: refreshExp || Math.round(Date.now() / 1000) + Number(refreshTokenLifetime),
		});

		return {
			accessTokenId: (await this.repositories.tokens.create(accessToken)).id,
			refreshTokenId: (await this.repositories.tokens.create(refreshToken)).id,
		};
	}

	async verifyTokenAndGetData(tokenId: string, isTypeRefresh = false): Promise<Omit<Token, 'id'>> {
		try {
			const {
				userId,
				browserId,
				deviceId,
				exp: expiresIn = 0,
			} = verify(tokenId, isTypeRefresh ? refreshTokenSecret : accessTokenSecret) as JwtPayload &
				Payload;

			await this.repositories.users.readOne(userId);

			return {
				userId,
				browserId,
				deviceId,
				type: isTypeRefresh ? 'refresh' : 'access',
				expiresIn,
			};
		} catch (err: unknown) {
			if (err instanceof JsonWebTokenError) {
				throw ApiError.unauthorized(err.message);
			}

			if (err instanceof Error) {
				throw new ApiError(err);
			}

			throw ApiError.unexpectedError();
		}
	}

	async register({
		userId,
		firstName,
		lastName,
		browserId,
		deviceId,
	}: IUserRegisterRequestBody & {
		userId: string;
	}): Promise<IResponseData> {
		const tokensIds = await this.generateTokens({ userId, browserId, deviceId });

		return { firstName, lastName, ...tokensIds };
	}

	async login({
		password,
		usernameOrEmail,
		deviceId,
		browserId,
	}: IUserLoginRequestBody): Promise<IResponseData> {
		const promises = Promise.all([
			this.repositories.users.readByUsername(usernameOrEmail),
			this.repositories.users.readByEmail(usernameOrEmail),
		]);

		const existingUser = (await promises).find(Boolean);

		if (!existingUser) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const isCorrectPassword = compareSync(password, existingUser.password);

		if (!isCorrectPassword) {
			throw ApiError.badRequest('Incorrect email or password');
		}

		const tokens = await this.generateTokens({ userId: existingUser.id, deviceId, browserId });

		return { firstName: existingUser.firstName, lastName: existingUser.lastName, ...tokens };
	}

	async logout(tokenId: string): Promise<void> {
		const token = await this.repositories.tokens.readOne(tokenId);

		if (!token) {
			throw ApiError.unauthorized('Token not found');
		}

		const tokens = await this.repositories.tokens.readCollByUserId(token.userId);
		const invalidTokensIds = tokens
			.filter((t) => t.browserId === token.browserId && t.deviceId === token.deviceId)
			.map((t) => t.id);

		await this.repositories.tokens.deleteColl(invalidTokensIds);
	}
}
