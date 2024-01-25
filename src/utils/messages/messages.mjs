export const messages = {
  errors: {
    fs: "FS operation failed",
    dir: "Error reading directory",
    fileRead: "Error reading file:",
    writeFile: "Error writing to the file:",
  },
  success: {
    copy: "Folder copied successfully.",
    rename: (oldName, newName) =>
      `File ${oldName} renamed to ${newName} successfully.`,
    delete: (fileName) => `File ${fileName} deleted successfully.`,
    list: "Files in the directory:",
    read: "Content of the file:",
    hash: (fileName) => `SHA256 Hash of ${fileName}:`,
    read: "File read successfully.",
    written: (filePath) => `Data has been written to ${filePath}`,
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
  stream: {
    read: "fileToRead.txt",
    write: {
      start: "Start typing to write to the file. Press Ctrl+C to end.",
      fileName: "fileToWrite.txt",
    },
  },
};
