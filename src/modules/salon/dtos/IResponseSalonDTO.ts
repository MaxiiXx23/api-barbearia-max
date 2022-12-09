import { Adress } from "../../adress/infra/typeorm/entities/Adress";

interface IResponseSalonDTO {
    id: string;
    photo: string;
    photo_url(): string;
    name: string;
    slogan: string;
    adress_id: string;
    adress: Adress;
}

export { IResponseSalonDTO };
