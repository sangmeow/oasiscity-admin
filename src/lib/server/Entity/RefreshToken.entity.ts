import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'secretgarden', schema: 'gardener', name: 'refresh_token' })
export class RefreshToken {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({ type: 'uuid', nullable: false })
	uuid: string;

	@Column('simple-json')
	payload: any;

	@Column({ type: 'boolean', default: false })
	is_valid: boolean;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	cre_date: any;

	@Column('integer', { nullable: false })
	expires: number;
}
