import { signJWT, verifyJWT } from './jwt.utils';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '$env/static/private';
import type { EntityManager } from 'typeorm';
import type { RefreshToken } from './Entity/RefreshToken.entity';
import { CustomError } from './customError';
import type { JwtPayload } from 'jsonwebtoken';

export const createAccessToken = (user: IUserToken, cookies: any): string => {
	const accessToken = signJWT({ username: user.username }, ACCESS_TOKEN_EXPIRES);
	cookies.set('accessToken', accessToken, {
		path: '/',
		//secure: true,
		httpOnly: true,
		maxAge: 60 * 60 // 60minutes
	});
	return accessToken;
};

export const createRefreshToken = (user: IUserToken, cookies: any): string => {
	const refreshToken = signJWT({ refresh_uuid: user.refresh_uuid }, REFRESH_TOKEN_EXPIRES);
	cookies.set('refreshToken', refreshToken, {
		path: '/',
		//secure: true,
		httpOnly: true,
		maxAge: 60 * 60 * 12 // 12hours
	});
	return refreshToken;
};

export const insertRefreshToken = async (transactionalEntityManager: EntityManager, refreshToken: RefreshToken) => {
	try {
		return await transactionalEntityManager.save(refreshToken);
	} catch (error: any) {
		throw new CustomError('005432', error.message, 500);
	}
};
