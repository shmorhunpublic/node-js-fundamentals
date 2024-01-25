export const ERRORS = {
  ENOENT: "ENOENT",
};

export const PATHS = {
  CREATE: ["files", "fresh.txt"],
  COPY_PATH: ["files"],
  COPY_TO: ["files_copy"],
  RENAME_FROM: (oldFileName) => ["files", oldFileName],
  RENAME_TO: (newFileName) => ["files", newFileName],
};
