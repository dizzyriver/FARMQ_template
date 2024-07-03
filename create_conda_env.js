const { execSync } = require("child_process");

// Read the environment name from an environment variable
const envName = process.env.PROJECT_NAME;

if (!envName) {
  console.error('Environment name not provided. Ensure the PROJECT_NAME environment variable is set.');
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