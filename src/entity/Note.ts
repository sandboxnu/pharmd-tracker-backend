import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Note {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    // date created/modified should be automatic for all entities

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({
        type: "simple-array"
    })
    tags: string[];

    // TODO: file attachments - AWS, who is in charge?

    // relations
    
    @ManyToOne(type => Student, student => student.notes)
    student: Student;

}