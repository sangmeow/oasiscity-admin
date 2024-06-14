import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USERNAME,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE
} from '$env/static/private';
import { User } from '$lib/server/Entity/User.entity';
import { RefreshToken } from './Entity/RefreshToken.entity';

export const PostgresDataSource = new DataSource({
	type: 'postgres',
	host: POSTGRES_HOST,
	port: +POSTGRES_PORT,
	username: POSTGRES_USERNAME,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DATABASE,
	logging: true,
	entities: [User, RefreshToken],
	//entities: ['/Entity/*.entity.{js,ts}'],
	synchronize: false
});

try {
	await PostgresDataSource.initialize();
	console.log('Data Source has been initialized!');
} catch (err) {
	console.error('Error during Data Source initialization', err);
}
// PostgresDataSource.initialize()
// 	.then(() => {
// 		console.log('Data Source has been initialized!');
// 	})
// 	.catch((err) => {
// 		console.error('Error during Data Source initialization', err);
// 	});
