import { container } from "tsyringe";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AdressRepository } from "../../../../modules/adress/infra/typeorm/repositories/AdressRepository";
import { IAdressRepository } from "../../../../modules/adress/repositories/IAdressRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IAdressRepository>(
    "AdressRepository",
    AdressRepository
);
