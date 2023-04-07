import { Repository, Token } from '@models/index';

export default class TokensRepository extends Repository<Token> {
	async create(token: Token): Promise<Token> {
		const allTokens = await this.readAll();

		const secondsNow = Math.round(Date.now() / 1000);
		const liveTokens = allTokens.filter((token) => token.expiresIn > secondsNow);

		await this.updateAll(liveTokens);

		return this.createOne(token);
	}

	async readById(id: string): Promise<Token> {
		return this.readOne(id);
	}

	async readCollByUserId(userId: string): Promise<Token[]> {
		return (await this.readAll()).filter((token) => token.userId === userId);
	}

	async delete(id: string): Promise<void> {
		await this.deleteOne(id);
	}
}
