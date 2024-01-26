import { spawn } from "child_process";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
import { PATHS } from "../utils/constants/constants.mjs";
/**
 * Spawns a child process running script.js and passes arguments to it.
 * Sets up IPC channels for stdin and stdout between the master and child processes.
 * @param {string[]} args Arguments to pass to the child process.
 */

const spawnChildProcess = async (args) => {
  const child = spawn(
    "node",
    [createFilePath(import.meta.url, PATHS.FILES_DIR("script.js")), ...args],
    {
      stdio: ["pipe", "pipe", process.stderr, "ipc"],
    }
  );

  // Redirect master process stdin to child process stdin
  process.stdin.pipe(child.stdin);

  // Redirect child process stdout to master process stdout
  child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  // Handle child process exit
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["arg1", "arg2"]);
