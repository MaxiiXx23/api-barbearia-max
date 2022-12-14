import { container } from "tsyringe";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AdressRepository } from "../../../../modules/adress/infra/typeorm/repositories/AdressRepository";
import { IAdressRepository } from "../../../../modules/adress/repositories/IAdressRepository";
import { SalonRepository } from "../../../../modules/salon/infra/typeorm/repositories/SalonRepository";
import { ISalonRepository } from "../../../../modules/salon/repositories/ISalonRepository";
import { ServicesRepository } from "../../../../modules/service/infra/typeorm/repositories/ServicesRepository";
import { IServicesRepository } from "../../../../modules/service/repositories/IServicesRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IAdressRepository>(
    "AdressRepository",
    AdressRepository
);

container.registerSingleton<ISalonRepository>(
    "SalonRepository",
    SalonRepository
);

container.registerSingleton<IServicesRepository>(
    "ServicesRepository",
    ServicesRepository
);
