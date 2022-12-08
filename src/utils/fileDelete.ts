import { stat, unlink } from "fs";

async function deleteFile(filename: string) {
    try {
        await stat(filename, (error) => {
            throw new Error(error.message);
        });
    } catch {
        return;
    }
    await unlink(filename, (error) => {
        throw new Error(error.message);
    });
}

export { deleteFile };
