export const ERRORS = {
  ENOENT: "ENOENT", // "Error NO ENTry" or "Error No Entity"
};

export const PATHS = {
  COPY_PATH: ["files"],
  COPY_TO: ["files_copy"],
  FILES_DIR: (fileName) => ["files", fileName],
};
