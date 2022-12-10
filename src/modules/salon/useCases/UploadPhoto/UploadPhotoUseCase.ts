import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ISalonRepository } from "../../repositories/ISalonRepository";

interface IRequest {
    id_user: string;
    id: string;
    photo_file: string;
}

@injectable()
class UploadPhotoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("SalonRepository")
        private salonRepository: ISalonRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ id_user, id, photo_file }: IRequest) {
        const user = await this.usersRepository.findById(id_user);

        if (!user.isAdmin) {
            throw new Error("User haven't permition.");
        }

        const salon = await this.salonRepository.findToUpdateById(id);

        if (!salon) {
            throw new Error("Salon not found.");
        }

        if (salon.photo !== "avatarPhoto.jpg") {
            await this.storageProvider.delete(salon.photo, "profile");
        }

        await this.storageProvider.save(photo_file, "profile");

        salon.photo = photo_file;

        const salonUpdated = await this.salonRepository.update(salon);
        return salonUpdated.photo_url();
    }
}

export { UploadPhotoUseCase };
