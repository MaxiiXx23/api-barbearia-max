import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Adress } from "../../../../adress/infra/typeorm/entities/Adress";

@Entity("salon")
class Salon {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    slogan: string;

    @Column()
    photo?: string;

    @OneToOne(() => Adress)
    @JoinColumn({ name: "adress_id" })
    adress: Adress;

    @Column()
    adress_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.photo = "avatarPhoto.jpg";
        }
    }
}

export { Salon };
