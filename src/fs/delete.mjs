import fs from "fs/promises";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Deletes a specified file.
 * @param {string} fileName The name of the file to be deleted.
 */

async function remove(fileName) {
  try {
    const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));

    // Check if the file exists
    await fs.access(filePath);

    // Delete the file
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === ERRORS.ENOENT) {
      throw new Error(messages.errors.fs);
    } else {
      throw error;
    }
  }
}

// Usage
const fileNameToRemove = contents.fs.delete;

remove(fileNameToRemove)
  .then(() => console.log(messages.success.delete(fileNameToRemove)))
  .catch((err) => console.error(err.message));
