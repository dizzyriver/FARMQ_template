#!/bin/zsh

# Check if an environment name was provided as an argument
if [ -z "$1" ]; then
    echo "No environment name provided. Usage: ./create_conda_env.sh <env_name>"
    exit 1
fi

# Name of the conda environment
ENV_NAME="$1"

# Path to the environment.yml file
ENV_FILE="python_env.yaml"

# Check if the environment exists by searching for it in the list of conda environments
if conda env list | grep -qw "$ENV_NAME"; then
    echo "Environment $ENV_NAME exists. Recreating..."
    # Remove the existing environment
    conda env remove --name "$ENV_NAME"
    # Create the environment from the file
    conda env create --name "$ENV_NAME" --file "$ENV_FILE"
else
    echo "Environment $ENV_NAME does not exist. Creating..."
    # Create the environment from the file
    conda env create --name "$ENV_NAME" --file "$ENV_FILE"
fi

echo "To activate the $ENV_NAME environment, use:"
echo "conda activate $ENV_NAME"