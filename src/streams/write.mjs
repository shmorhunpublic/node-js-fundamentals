import fs from "fs";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Writes data from process.stdin to a file named fileToWrite.txt using a Writable Stream.
 * @param {string} fileName The name of the file to write to.
 */

const write = async (fileName) => {
  const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));
  const writeStream = fs.createWriteStream(filePath);

  console.log(contents.stream.write.start);

  // Pipe data from process.stdin to the file
  process.stdin.pipe(writeStream);

  process.stdin.on("end", () => {
    console.log(messages.success.written(filePath));
  });

  writeStream.on("error", (err) => {
    console.error(messages.errors.writeFile, err);
  });
};
const fileNameToWrite = contents.stream.write.fileName;

await write(fileNameToWrite);
