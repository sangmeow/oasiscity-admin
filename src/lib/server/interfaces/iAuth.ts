import type { IntegerType, Timestamp } from 'typeorm';

interface IRefreshToken {
	uuid: string;
	payload: JsonWebKey;
	is_valid?: boolean;
	cre_date?: Timestamp;
	expires?: IntegerType;
}
