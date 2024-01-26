import { Transform, pipeline } from "stream";
import { messages } from "../utils/messages/messages.mjs";

/**
 * Creates a Transform Stream that reverses the text.
 */

const reverseTextTransform = new Transform({
  transform(chunk, _encoding, callback) {
    // Reverse the text and pass it on
    const reversed = chunk.toString().split("").reverse().join("");
    callback(null, reversed);
  },
});

/**
 * A function that reads data from stdin, transforms it, and outputs it to stdout.
 */

const transform = async () => {
  return new Promise((resolve, reject) => {
    pipeline(process.stdin, reverseTextTransform, process.stdout, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

transform().catch((err) => console.error(messages.errors.transform, err));
