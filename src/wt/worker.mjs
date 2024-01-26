import { parentPort } from "worker_threads";
import { createFilePath } from "../utils/functions/createFilePath.mjs";

// Function to compute the nth Fibonacci number
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

// Listener for messages from the main thread
parentPort.on("message", (n) => {
  const result = nthFibonacci(n);
  sendResult(result);
});

// Function to send the result back to the main thread
const sendResult = (result) => {
  parentPort.postMessage(result);
};
