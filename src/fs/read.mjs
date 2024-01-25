import fs from "fs/promises";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Reads and prints the content of a specified file.
 * @param {string} fileName The name of the file to read.
 */
async function read(fileName) {
  try {
    const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));

    // Check if the file exists
    await fs.access(filePath);

    // Read the file and print its content
    const content = await fs.readFile(filePath, "utf8");
    console.log("Content of the file:", content);
  } catch (error) {
    if (error.code === ERRORS.ENOENT) {
      throw new Error(messages.errors.fs);
    } else {
      throw error;
    }
  }
}

// Usage
const fileNameToRead = contents.fs.read;

read(fileNameToRead).catch((err) => console.error(err.message));
