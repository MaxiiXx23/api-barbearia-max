import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UploadPhotoUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ id, file }: IRequest): Promise<string> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new ApiError("User not found.", 400);
        }

        if (user.photo !== "avatarUserIcon.png") {
            await this.storageProvider.delete(user.photo, "profile");
        }

        await this.storageProvider.save(file, "profile");

        const photo = file;

        const { photo: photoUser } = await this.usersRepository.update({
            id,
            photo,
        });

        return `/profile/${photoUser}`;
    }
}

export { UploadPhotoUserUseCase };
