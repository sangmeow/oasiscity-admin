import jwt from 'jsonwebtoken';
import { privateKey, publicKey } from './secret/secret';

// signin jwt
export function signJWT(payload: object, expiresIn: string | number): any {
	return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

// verify jwt
export function verifyJWT(token: string): any {
	try {
		const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
		return { payload: decoded };
	} catch (error: any) {
		return { payload: null, message: error.message };
	}
}
