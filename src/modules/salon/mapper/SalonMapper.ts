/* eslint-disable @typescript-eslint/no-unused-vars */
import { instanceToInstance } from "class-transformer";

import { IResponseSalonDTO } from "../dtos/IResponseSalonDTO";
import { Salon } from "../infra/typeorm/entities/Salon";

class SalonMapper {
    static toDTO({
        id,
        photo,
        photo_url,
        name,
        slogan,
        adress_id,
        created_at,
        updated_at,
        adress,
    }: Salon): IResponseSalonDTO {
        const salon = instanceToInstance({
            id,
            photo,
            photo_url,
            name,
            slogan,
            adress_id,
            adress,
        });
        return salon;
    }
}

export { SalonMapper };
