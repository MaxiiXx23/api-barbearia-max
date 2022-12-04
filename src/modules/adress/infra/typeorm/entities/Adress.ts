import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";

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

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

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
