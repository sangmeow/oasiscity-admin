import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'secretgarden', schema: 'gardener', name: 'user' })
export class User {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({ type: 'uuid', nullable: false })
	uuid: string;

	@Column('varchar', { length: 128, nullable: false, unique: true })
	username: string;

	@Column('varchar', { length: 512, nullable: false })
	password: string;

	@Column('varchar', { length: 32, nullable: false, default: 'user' })
	role: string;

	@Column('varchar', { length: 64 })
	nickname: string;

	@Column('varchar', { length: 128 })
	first_name: string;

	@Column('varchar', { length: 128 })
	middle_name: string;

	@Column('varchar', { length: 128 })
	last_name: string;

	@Column('varchar', { length: 512 })
	email: string;

	@Column('varchar', { length: 512 })
	mobile: string;

	@Column('simple-json')
	info: any;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	cre_date: any;

	@Column('timestamp with time zone')
	udt_date: any;

	@Column('timestamp with time zone')
	del_date: any;

	@Column({ type: 'boolean', default: false })
	use_yn: boolean;

	@Column({ type: 'boolean', default: false })
	del_yn: boolean;
}
