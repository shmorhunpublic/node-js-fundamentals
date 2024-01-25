/**
 * Parses command line arguments and prints them in a specified format.
 */
const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i += 2) {
    // Assuming the format is always --key value
    const key = args[i].replace("--", "");
    const value = args[i + 1];
    parsedArgs[key] = value;
  }

  for (const [key, value] of Object.entries(parsedArgs)) {
    console.log(`${key} is ${value}`);
  }
};

parseArgs();
