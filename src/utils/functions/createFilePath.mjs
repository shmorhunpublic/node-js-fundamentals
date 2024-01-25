import { fileURLToPath } from "url";
import { dirname, join } from "path";

/**
 * Creates a full file path based on a base URL and relative paths.
 * @param {string} baseUrl - The base URL, usually this is import.meta.url in ES modules.
 * @param {string[]} paths - An array of strings that represent the relative paths.
 * @returns {string} The full path to the file.
 */
export const createFilePath = (baseUrl, paths) => {
  // Converting the file URL to a directory path
  const __dirname = dirname(fileURLToPath(baseUrl));

  // Joining the directory with the relative paths to create the full file path
  return join(__dirname, ...paths);
};
