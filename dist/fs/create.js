var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
import path from "path";
import { createFilePath } from "../utils/functions/createFilePath";
import { errors, paths } from "../utils/constants/constants";
import { contents, messages } from "../utils/messages/messages";
const create = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = createFilePath(import.meta.url, paths.create);
    try {
        yield fs.access(filePath);
        throw new Error(messages.errors.fs);
    }
    catch (error) {
        const nodeError = error;
        if (nodeError.code === errors.ENOENT) {
            const content = contents.fs.create;
            yield fs.writeFile(filePath, content);
            const fileInfo = {
                "File Name": path.basename(filePath),
                Address: filePath,
                Content: content,
            };
            console.table([fileInfo]);
        }
        else {
            throw error;
        }
    }
});
create().catch((err) => console.error(err.message));
