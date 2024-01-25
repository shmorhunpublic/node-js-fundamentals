import fs from "fs";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Reads the content of a specified file using a Readable Stream and prints it to process.stdout.
 * @param {string} fileName The name of the file to read.
 * @returns {Promise<void>} A Promise that resolves when the file reading is complete or rejects if an error occurs.
 */

const read = async (fileName) => {
  const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));

  // Return a new Promise that encapsulates the asynchronous file reading operation
  return new Promise((resolve, reject) => {
    // Create a readable stream from the file
    const readStream = fs.createReadStream(filePath);

    // 'data' event listener for handling data chunks read from the file
    readStream.on("data", (chunk) => process.stdout.write(chunk));

    // 'end' event listener to resolve the Promise when file reading is complete
    readStream.on("end", () => resolve());

    // 'error' event listener to reject the Promise if an error occurs during file reading
    readStream.on("error", (err) => reject(err));
  });
};
const fileNameToRead = contents.stream.read;

await read(fileNameToRead)
  .then(() => console.log(`\n${messages.success.read}`))
  .catch((err) => console.error(messages.errors.fileRead, err.message));
