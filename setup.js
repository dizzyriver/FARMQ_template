const fs = require("fs");
const path = require("path");

// Assuming the project name is passed as an argument to the setup script
const projectName = process.argv[2];

if (!projectName) {
  console.error(
    "Project name not provided. Usage: node setup.js <project-name>"
  );
  process.exit(1);
}

// Update project-config.json with the new project name
const configPath = path.join(__dirname, "project-config.json");
fs.writeFileSync(configPath, JSON.stringify({ name: projectName }, null, 2));

console.log(`Project name set to ${projectName}`);
