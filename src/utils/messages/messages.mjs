export const messages = {
  errors: {
    fs: "FS operation failed",
    dir: "Error reading directory",
  },
  success: {
    copy: "Folder copied successfully.",
    rename: (oldName, newName) =>
      `File ${oldName} renamed to ${newName} successfully.`,
    delete: (fileName) => `File ${fileName} deleted successfully.`,
  },
};

export const contents = {
  fs: {
    create: "I am fresh and young",
    rename: {
      old: "wrongFilename.txt",
      new: "properFilename.md",
    },
    delete: "fileToRemove.txt",
  },
};
