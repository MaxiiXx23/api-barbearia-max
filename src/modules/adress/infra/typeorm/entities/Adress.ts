import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("adress")
class Adress {
    @PrimaryColumn()
    id?: string;

    @Column()
    cep: string;

    @Column()
    public_place: string;

    @Column()
    number: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    complement: string;

    @Column()
    reference: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Adress };
