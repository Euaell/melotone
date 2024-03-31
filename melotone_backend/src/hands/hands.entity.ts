import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hands {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ unique: true, length: 50 })
    name: string;
}
