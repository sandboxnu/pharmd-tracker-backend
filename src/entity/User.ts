import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {AccessLevel} from "./Enums";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: "enum",
        enum: AccessLevel,
        default: AccessLevel.READ
    })
    accessLevel: AccessLevel;

}

