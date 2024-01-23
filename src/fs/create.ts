import fs from "fs/promises";
import path from "path";
import { createFilePath } from "../utils/functions/createFilePath";
import { errors, paths } from "../utils/constants/constants";
import { contents, messages } from "../utils/messages/messages";

const create = async (): Promise<void> => {
  const filePath = createFilePath(import.meta.url, paths.create);
  try {
    await fs.access(filePath);
    throw new Error(messages.errors.fs);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === errors.ENOENT) {
      const content = contents.fs.create;
      await fs.writeFile(filePath, content);

      const fileInfo = {
        "File Name": path.basename(filePath),
        Address: filePath,
        Content: content,
      };

      console.table([fileInfo]);
    } else {
      throw error;
    }
  }
};

create().catch((err: Error) => console.error(err.message));
