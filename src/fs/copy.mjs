import fs from "fs/promises";
import path from "path";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { ERRORS, PATHS } from "../utils/constants/constants.mjs";
import { messages } from "../utils/messages/messages.mjs";

/**
 * Copy all contents of a directory to another directory.
 * @param {string} srcDir Source directory to copy from.
 * @param {string} destDir Destination directory to copy to.
 */
async function copy(srcDir, destDir) {
  try {
    // Check if source directory exists
    await fs.access(srcDir);

    // Check if destination directory already exists
    try {
      await fs.access(destDir);
      throw new Error(messages.errors.fs); // Destination directory already exists
    } catch (error) {
      if (error.code !== ERRORS.ENOENT) throw error;
    }

    // Create the destination directory
    await fs.mkdir(destDir);

    // Get the files in the source directory
    const files = await fs.readdir(srcDir);

    // Copy each file/directory
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      const stat = await fs.stat(srcFile);

      if (stat.isDirectory()) {
        // Recursive call for directory
        await copy(srcFile, destFile);
      } else {
        // Copy file
        await fs.copyFile(srcFile, destFile);
      }
    }
  } catch (error) {
    throw new Error(messages.errors.fs);
  }
}

// Usage
const srcDirectoryPath = createFilePath(import.meta.url, PATHS.COPY_PATH);
const destDirectoryPath = createFilePath(import.meta.url, PATHS.COPY_TO);

copy(srcDirectoryPath, destDirectoryPath)
  .then(() => console.log(messages.success.copy))
  .catch((err) => console.error(err.message));
