import { instanceToInstance } from "class-transformer";

import { IRequestAdressDTO } from "../dtos/IRequestAdressDTO";
import { IResponseAdressDTO } from "../dtos/IResponseAdressDTO";

class AdressMapper {
    static toDTO({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user_id,
        id,
        cep,
        public_place,
        number,
        complement,
        city,
        state,
        country,
        reference,
    }: IRequestAdressDTO): IResponseAdressDTO {
        const adress = instanceToInstance({
            id,
            cep,
            public_place,
            number,
            complement,
            city,
            state,
            country,
            reference,
        });
        return adress;
    }
}

export { AdressMapper };
