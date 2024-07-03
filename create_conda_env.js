const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Read the environment name from package.json
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const envName = packageJson.name;

if (!envName) {
  console.error("Environment name not found in package.json.");
  process.exit(1);
}

try {
  execSync(`cd backend && ./create_conda_env.sh ${envName}`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(`Error creating conda environment: ${error.message}`);
  process.exit(1);
}
