import fs from "fs/promises";
import path from "path";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Creates a new file with predefined content.
 * If the file already exists, throws an error.
 * Logs file information upon successful creation.
 * * @returns {Promise<void>} Create file on the file path or throw an error
 */

const create = async () => {
  // Generating the file path
  const filePath = createFilePath(import.meta.url, PATHS.CREATE);

  try {
    // Checking if the file already exists
    await fs.access(filePath);
    // If the file exists, throw an error
    throw new Error(messages.errors.fs);
  } catch (error) {
    // Checking if the error is because the file doesn't exist
    if (error.code === ERRORS.ENOENT) {
      // Defining content for the new file
      const content = contents.fs.create;
      // Writing content to the new file
      await fs.writeFile(filePath, content);

      // Information about the created file
      const fileInfo = {
        "File Name": path.basename(filePath),
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
create().catch((err) => console.error(err.message));
