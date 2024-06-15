import { CustomError } from '$lib/server/customError.js';
import { PostgresDataSource } from '$lib/server/typeorm.utils.js';
import { User } from '$lib/server/Entity/User.entity';
import { dataBind } from '$lib/server/data.bind.js';
import { getMapFromList } from '$lib/server';
import { CResponse } from '$lib/server/cResponse';
import { verifyJWT } from '$lib/server/jwt.utils.js';
import { createCookieSession, deleteCookieSession } from '$lib/server/cookies';

export const GET = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');
	if (accessToken) {
		const verifiedToken = verifyJWT(accessToken);
		let userList: any[] = [];
		if (verifiedToken.payload?.username) {
			await PostgresDataSource.manager.transaction(async (transactionalEntityManager) => {
				const userInfo = await transactionalEntityManager.findOne(User, { where: { username: verifiedToken.payload?.username } });
				userList.push(getMapFromList(userInfo, ['username', 'role', 'nickname', 'first_name', 'middle_name', 'last_name', 'email', 'mobile', 'info', 'cre_date']));
			});
			return new Response(JSON.stringify(new CResponse('000000', 'success', userList)));
		}
	}
	throw new CustomError('000000', 'Invalid token value', 401);
};

export const POST = async ({ request, cookies }) => {
	// { username password } must have
	const userEntity = dataBind(await request.json(), new User());
	try {
		await PostgresDataSource.manager.transaction(async (transactionalEntityManager) => {
			// find admin
			const searchResult = await transactionalEntityManager.findOne(User, { where: { username: userEntity.username, password: userEntity.password } });
			if (searchResult) await createCookieSession(transactionalEntityManager, searchResult, cookies);
			else return new Response(JSON.stringify(new CResponse('900000', 'failed', [])));
		});
		return new Response(JSON.stringify(new CResponse('000000', 'success', [])));
	} catch (error) {
		throw new CustomError('995432', 'Search data exception');
	}
};

export const PUT = async ({ request, cookies }) => {
	// { username password } must have
	const userEntity = dataBind(await request.json(), new User());
	try {
		let insertResult: any = null;
		// IsolationLevel = "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";
		('SERIALIZABLE');
		await PostgresDataSource.manager.transaction(async (transactionalEntityManager) => {
			// insert new user
			insertResult = await transactionalEntityManager.save(userEntity);
			await createCookieSession(transactionalEntityManager, userEntity, cookies);
		});
		return new Response(JSON.stringify(new CResponse('000000', 'success', insertResult)));
	} catch (error: any) {
		throw new CustomError('005432', error.message, 500);
	}
};

export const DELETE = async ({ cookies }) => {
	try {
		deleteCookieSession(cookies);
	} catch (error: any) {
		throw new CustomError('000000', error.message, 500);
	}
	return new Response(JSON.stringify(new CResponse('000000', 'success', [])));
};
