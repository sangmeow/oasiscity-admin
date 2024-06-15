import type { EntityManager } from 'typeorm';
import { createAccessToken, createRefreshToken, insertRefreshToken } from './token.utils';
import { getMapFromList } from '.';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from './Entity/RefreshToken.entity';
import { CustomError } from './customError';
import { dataBind } from './data.bind';

export const createCookieSession = async (transactionalEntityManager: EntityManager, userEntity: any, cookies: any) => {
	try {
		// create access_token and refresh_token
		const accessToken = createAccessToken({ username: userEntity.username }, cookies);
		const generatedUuidV4 = uuidv4();
		const refreshToken = createRefreshToken({ refresh_uuid: generatedUuidV4 }, cookies);

		// insert refresh_token in database
		const refreshTokenEntity = dataBind(
			{
				refresh_uuid: generatedUuidV4,
				payload: getMapFromList(jwtDecode(accessToken), ['username']),
				expires: jwtDecode(refreshToken).exp
			},
			new RefreshToken()
		);
		await insertRefreshToken(transactionalEntityManager, refreshTokenEntity);
	} catch (error: any) {
		throw new CustomError('000000', error.message, 500);
	}
};

export const deleteCookieSession = async (cookies: any) => {
	try {
		cookies.set('accessToken', '', {
			path: '/',
			httpOnly: true,
			maxAge: 0
		});
		cookies.set('refreshToken', '', {
			path: '/',
			httpOnly: true,
			maxAge: 0
		});
	} catch (error: any) {
		throw new CustomError('000000', error.message, 500);
	}
};
