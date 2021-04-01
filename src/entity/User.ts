import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AccessLevel } from './Enums';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
      type: 'enum',
      enum: AccessLevel,
      default: AccessLevel.READ,
    })
    accessLevel: AccessLevel;
}
