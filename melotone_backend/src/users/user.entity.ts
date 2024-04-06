import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
    ARCHIVED = 'archived',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ unique: true, length: 200 })
    name: string;

    @Column({ unique: true, length: 200 })
    email: string;

    @Column({ length: 500 })
    password: string;

    @Column({ length: 50, default: UserStatus.INACTIVE})
    status: UserStatus;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

@Entity()
export class UserSession {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ length: 200 })
    token: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
