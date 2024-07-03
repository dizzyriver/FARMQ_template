const { execSync } = require("child_process");

// Assuming the project name is passed as an argument to the setup script
const projectName = process.argv[2];

if (!projectName) {
  console.error('Project name not provided. Usage: node setup.js <project-name>');
  process.exit(1);
}

// Set the PROJECT_NAME environment variable and run the conda environment setup script
try {
  execSync(`PROJECT_NAME=${projectName} node create_conda_env.js`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(`Error during setup: ${error.message}`);
  process.exit(1);
}

console.log(`Project setup complete with name: ${projectName}`);