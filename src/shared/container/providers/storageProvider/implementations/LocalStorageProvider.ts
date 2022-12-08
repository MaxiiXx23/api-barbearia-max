import fs from "fs";
import { resolve } from "path";

import { upload } from "../../../../../config/upload";
import { deleteFile } from "../../../../../utils/fileDelete";
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );
        return file;
    }
    async delete(file: string, folder: string): Promise<string> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
        try {
            await deleteFile(filename);
            return `file deleted.`;
        } catch (error) {
            return error;
        }
    }
}

export { LocalStorageProvider };
