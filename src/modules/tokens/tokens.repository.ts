import { Repository, Token } from '@models/index';

export default class TokensRepository extends Repository<Token> {
	async readCollByUserId(userId: string): Promise<Token[]> {
		const allTokens = await this.read();

		return allTokens.filter((t) => t.userId === userId);
	}
}
