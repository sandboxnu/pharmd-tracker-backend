import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp,
} from 'typeorm';
import { Student } from './Student';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: bigint;

    // date created/modified should be automatic for all entities

    @Column()
    title: string;

    @Column()
    body: string;

    @Column('timestamptz', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    date: Timestamp;

    @Column({
      type: 'simple-array',
    })
    tags: string[];

    // TODO: file attachments - AWS, who is in charge?

    // relations

    @ManyToOne(() => Student, (student) => student.notes, { eager: true })
    student: Student;
}
