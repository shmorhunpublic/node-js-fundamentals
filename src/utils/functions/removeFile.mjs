import fs from "fs/promises";
import { ERRORS } from "../constants/constants.mjs";
import { messages } from "../messages/messages.mjs";

/**
 * Deletes a specified file by its full path.
 * @param {string} filePath The full path of the file to be deleted.
 */
export async function removeFile(filePath) {
  try {
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
