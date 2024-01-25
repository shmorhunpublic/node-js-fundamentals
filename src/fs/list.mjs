import fs from "fs/promises";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Lists all filenames in a specified directory.
 * @param {string} dirName The name of the directory to list files from.
 */

async function list(dirName) {
  try {
    const dirPath = createFilePath(import.meta.url, [dirName]);

    // Check if the directory exists
    await fs.access(dirPath);

    // Read the directory and list the filenames
    const files = await fs.readdir(dirPath);
    console.log(messages.success.list, files);
  } catch (error) {
    if (error.code === ERRORS.ENOENT) {
      throw new Error(messages.errors.fs);
    } else {
      throw error;
    }
  }
}

// Usage
const directoryName = contents.fs.list;

list(directoryName).catch((err) => console.error(err.message));
