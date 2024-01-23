import * as fs from "fs";
import * as path from "path";

const renameFilesInDirectory = (directory: string): void => {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(directory, file.name);
      if (file.isDirectory()) {
        renameFilesInDirectory(fullPath);
      } else if (path.extname(file.name) === ".js") {
        const newFullPath = path.join(
          directory,
          path.basename(file.name, ".js") + ".ts"
        );
        fs.rename(fullPath, newFullPath, (err) => {
          if (err) {
            console.error("Error renaming file:", err);
          } else {
            console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
          }
        });
      }
    });
  });
};
