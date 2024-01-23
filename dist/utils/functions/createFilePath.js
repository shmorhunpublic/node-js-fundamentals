import { fileURLToPath } from "url";
import { dirname, join } from "path";
export const createFilePath = (baseUrl, paths) => {
  const __dirname = dirname(fileURLToPath(baseUrl));
  return join(__dirname, ...paths);
};
