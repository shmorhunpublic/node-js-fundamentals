import fs from "fs/promises";
import path from "path";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Creates a new file with predefined content.
 * If the file already exists, throws an error.
 * Logs file information upon successful creation.
 * @param {string} fileName - The file name to create.
 * @returns {Promise<void>} - Create file on the file path or throw an error.
 */

const create = async (fileName) => {
  // Generating the file path
  const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));

  try {
    // Checking if the file already exists
    await fs.access(filePath);
    // If the file exists, throw an error
    throw new Error(messages.errors.fs);
  } catch (error) {
    // Checking if the error is because the file doesn't exist
    if (error.code === ERRORS.ENOENT) {
      // Defining content for the new file
      const content = contents.fs.create.content;
      // Writing content to the new file
      await fs.writeFile(filePath, content);

      // Information about the created file
      const fileInfo = {
        "File created": path.basename(filePath),
        Address: filePath,
        Content: content,
      };

      // Displaying the file info in a table format in the console
      console.table([fileInfo]);
    } else {
      // If the error is not related to the file's non-existence, rethrow it
      throw error;
    }
  }
};

// Executing the create function and handling potential errors
create(contents.fs.create.fileName).catch((err) => console.error(err.message));
