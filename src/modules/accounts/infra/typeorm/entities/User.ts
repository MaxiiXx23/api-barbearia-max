import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    photo: string;

    @Column()
    phone: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Expose({ name: "photo_url" })
    photo_url(): string {
        return `/profile/${this.photo}`;
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.photo = "avatarUserIcon.png";
        }
    }
}

export { User };
