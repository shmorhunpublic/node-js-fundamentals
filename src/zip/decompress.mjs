import fs from "fs";
import zlib from "zlib";
import path from "path";
import { removeFile } from "../utils/functions/removeFile.mjs";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Decompresses a .gz archive to a specific file in the same directory.
 * @param {string} compressedFilePath The full path of the .gz file to decompress.
 * @param {string} outputFileName The name of the file to output the decompressed data.
 */

async function decompress(compressedFilePath, outputFileName) {
  const outputFilePath = path.join(
    path.dirname(compressedFilePath),
    outputFileName
  );

  // Create a read stream for the .gz file
  const readStream = fs.createReadStream(compressedFilePath);

  // Create a write stream for the output file
  const writeStream = fs.createWriteStream(outputFilePath);

  // Create a gunzip transform stream
  const gunzip = zlib.createGunzip();

  // Pipe the read stream through gunzip, then to the write stream
  readStream.pipe(gunzip).pipe(writeStream);

  const fileToDecompressName = path.basename(compressedFilePath);

  console.log(
    messages.success.decompress(fileToDecompressName, outputFileName)
  );

  await removeFile(compressedFilePath);
}

const compressedFilePath = createFilePath(
  import.meta.url,
  PATHS.FILES_DIR(contents.zip.gz)
);
const outputFileName = contents.zip.txt;

decompress(compressedFilePath, outputFileName).catch((err) =>
  console.error(messages.errors.decompress, err)
);
