/**
 * Parses and prints environment variables with the prefix 'RSS_'.
 */
function printEnv() {
  const startedWithRSSVariables = Object.entries(process.env).filter(([key]) =>
    key.startsWith("RSS_")
  );
  const rssVariablesList = startedWithRSSVariables.map(
    ([key, value]) => `${key}=${value}`
  );
  const rssVariables = rssVariablesList.join("; ");

  console.log(rssVariables);
}

// Execution
printEnv();
