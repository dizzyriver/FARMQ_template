const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your project name: ", function (name) {
  rl.close();

  // Path to frontend package.json file
  const frontendPackageJsonPath = path.join(
    __dirname,
    "frontend",
    "package.json"
  );

  // Function to update package.json
  function updatePackageJson(filePath) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      const packageJson = JSON.parse(data);
      packageJson.name = name;

      fs.writeFile(
        filePath,
        JSON.stringify(packageJson, null, 2),
        "utf8",
        (err) => {
          if (err) throw err;
          console.log(`Project name updated in ${filePath}`);
        }
      );
    });
  }

  // Update package.json in frontend
  updatePackageJson(frontendPackageJsonPath);
});
