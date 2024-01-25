export const messages = {
  errors: {
    fs: "FS operation failed",
    dir: "Error reading directory",
    fileRead: "Error reading file:",
  },
  success: {
    copy: "Folder copied successfully.",
    rename: (oldName, newName) =>
      `File ${oldName} renamed to ${newName} successfully.`,
    delete: (fileName) => `File ${fileName} deleted successfully.`,
    list: "Files in the directory:",
    read: "Content of the file:",
    hash: (fileName) => `SHA256 Hash of ${fileName}:`,
  },
};

export const contents = {
  fs: {
    create: { fileName: "fresh.txt", content: "I am fresh and young" },
    rename: {
      old: "wrongFilename.txt",
      new: "properFilename.md",
    },
    delete: "fileToRemove.txt",
    list: "files",
    read: "fileToRead.txt",
  },
  hash: "fileToCalculateHashFor.txt",
};
