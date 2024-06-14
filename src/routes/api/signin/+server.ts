import { CustomError } from '$lib/server/customError.js';
import { PostgresDataSource } from '$lib/server/typeorm.utils.js';
import { User } from '$lib/server/Entity/User.entity';
import { dataBind } from '$lib/server/data.bind.js';
import { createAccessToken, createRefreshToken, insertRefreshToken } from '$lib/server/token.utils.js';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import type { EntityManager } from 'typeorm';
import { RefreshToken } from '$lib/server/Entity/RefreshToken.entity.js';
import { getMapFromList } from '$lib/server';

export const GET = async ({ request, cookies }): Promise<Response> => {
	// { username , password } info
	let bodyData = await request.json(); // username password

	return new Response(JSON.stringify(bodyData));
};

export const POST = async ({ request, cookies }) => {
	let bodyData: ILogin = await request.json();
	const userEntity = new User();
	userEntity.username = bodyData.username;
	userEntity.password = bodyData.password;
	let insertResult: any = null;
	try {
		insertResult = await PostgresDataSource.manager.save(userEntity);
	} catch (error) {
		throw new CustomError('995432', 'Insert data exception');
	}
	return new Response(JSON.stringify(insertResult));
};

export const PUT = async ({ request, cookies }) => {
	// { username password } must have
	const userEntity = dataBind(await request.json(), new User());
	let insertResult: any = null;
	try {
		// IsolationLevel = "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";
		('SERIALIZABLE');
		await PostgresDataSource.manager.transaction(async (transactionalEntityManager) => {
			// insert new user
			insertResult = await transactionalEntityManager.save(userEntity);

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
		});
	} catch (error: any) {
		//deleteCookies(cookies);
		throw new CustomError('005432', error.message, 500);
	}
	return new Response(JSON.stringify(insertResult));
};

export const DELETE = async ({ request }) => {
	let bodyData = await request.json();
	return new Response(JSON.stringify(bodyData));
};

const deleteCookies = async (cookies: any): Promise<void> => {
	cookies.delete('access_token');
	cookies.delete('refresh_token');
};
