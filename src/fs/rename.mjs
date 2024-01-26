// rename.mjs
import fs from "fs/promises";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Renames a file from a wrong filename to a proper filename.
 * @param {string} oldFileName The incorrect or old file name.
 * @param {string} newFileName The correct or new file name with extension.
 */
async function rename(oldFileName, newFileName) {
  try {
    const oldFilePath = createFilePath(
      import.meta.url,
      PATHS.FILES_DIR(oldFileName)
    );
    const newFilePath = createFilePath(
      import.meta.url,
      PATHS.FILES_DIR(newFileName)
    );

    // Check if the old file exists
    await fs.access(oldFilePath);

    // Check if the new file already exists
    try {
      await fs.access(newFilePath);
      throw new Error(messages.errors.fs); // New file already exists
    } catch (error) {
      if (error.code !== ERRORS.ENOENT) throw error;
    }

    // Rename the file
    await fs.rename(oldFilePath, newFilePath);
  } catch (error) {
    throw new Error(messages.errors.fs);
  }
}

// Usage
const oldFileName = contents.fs.rename.old;
const newFileName = contents.fs.rename.new;

rename(oldFileName, newFileName)
  .then(() => console.log(messages.success.rename(oldFileName, newFileName)))
  .catch((err) => console.error(err.message));

// to rename back to old name => renameFile(newFileName, oldFileName)
