import { Worker } from "worker_threads";
import os from "os";
import { createFilePath } from "../utils/functions/createFilePath.mjs";
// import { workerPath } from "./worker.mjs";
/**
 * Performs calculations using worker threads.
 */

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const promises = [];
  console.log("Cores:", numCores);

  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(createFilePath(import.meta.url, ["worker.mjs"]));
    const numToSend = 10 + i; // Incremental number starting from 10
    const promise = new Promise((resolve, reject) => {
      worker.on("message", (result) => {
        resolve({ status: "resolved", data: result });
      });

      worker.on("error", (err) => {
        console.error("Worker error:", err);
        resolve({ status: "error", data: null }); // Resolve with error status
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
        }
      });
    });

    worker.postMessage(numToSend);
    promises.push(promise);
  }

  const results = await Promise.all(promises);
  console.log("All workers finished:", results);
};

performCalculations().catch((err) =>
  console.error("Error during calculations:", err)
);
