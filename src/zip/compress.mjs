import fs from "fs";
import zlib from "zlib";
import { removeFile } from "../utils/functions/removeFile.mjs";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
import { messages } from "../utils/messages/messages.mjs";
/**
 * Compresses a file to a .gz archive using zlib.
 * @param {string} inputFile The name of the file to compress.
 * @param {string} outputFile The name of the output .gz file.
 */

const compress = async (inputFile, outputFile) => {
  const inputFilePath = createFilePath(
    import.meta.url,
    PATHS.FILES_DIR(inputFile)
  );

  const outputFilePath = createFilePath(
    import.meta.url,
    PATHS.FILES_DIR(outputFile)
  );

  // Create a read stream for the input file
  const readStream = fs.createReadStream(inputFilePath);

  // Create a write stream for the output file
  const writeStream = fs.createWriteStream(outputFilePath);

  // Create a gzip transform stream
  const gzip = zlib.createGzip();

  // Pipe the read stream through gzip, then to the write stream
  readStream.pipe(gzip).pipe(writeStream);

  console.log(messages.success.compress(inputFile, outputFile));
  await removeFile(inputFilePath);
};

const inputFile = "fileToCompress.txt";
const outputFile = "archive.gz";

await compress(inputFile, outputFile).catch((err) =>
  console.error(messages.errors.compress, err)
);
