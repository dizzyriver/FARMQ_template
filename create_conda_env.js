const { execSync } = require("child_process");
const { name } = require("./package.json");

const envName = name;

try {
  execSync(`cd backend && ./create_conda_env.sh ${envName}`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(`Error creating conda environment: ${error.message}`);
  process.exit(1);
}
