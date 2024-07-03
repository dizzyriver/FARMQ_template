const { execSync } = require("child_process");
const fs = require("fs");

// Read the environment name from a configuration file or environment variable
const envName =
  process.env.PROJECT_NAME ||
  JSON.parse(fs.readFileSync("./project-config.json", "utf8")).name;

try {
  execSync(`cd backend && ./create_conda_env.sh ${envName}`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(`Error creating conda environment: ${error.message}`);
  process.exit(1);
}
