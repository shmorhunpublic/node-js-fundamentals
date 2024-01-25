import crypto from "crypto";
import fs from "fs";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
import { contents, messages } from "../utils/messages/messages.mjs";

/**
 * Calculates the SHA256 hash of a given file and logs it to the console.
 * @param {string} fileName The name of the file to hash.
 */

async function calculateHash(fileName) {
  const filePath = createFilePath(import.meta.url, PATHS.FILES_DIR(fileName));
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => hash.update(chunk));
  stream.on("end", () => {
    const hexHash = hash.digest("hex");
    console.log(`${messages.success.hash(fileName)} ${hexHash}`);
  });
  stream.on("error", (err) => {
    console.error(messages.errors.fileRead, err.message);
  });
}

// Usage
const fileName = contents.hash;

calculateHash(fileName);
