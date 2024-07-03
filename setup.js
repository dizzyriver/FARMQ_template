const fs = require("fs");
const path = require("path");

// Get the project name from the command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error(
    "Project name not provided. Usage: node setup.js <project-name>"
  );
  process.exit(1);
}

// Read the package.json file
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Update the project name
packageJson.name = projectName;

// Write the updated package.json file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Project setup complete with name: ${projectName}`);
