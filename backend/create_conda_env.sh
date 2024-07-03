#!/bin/zsh

# Name of the conda environment
ENV_NAME="farmq"

# Path to the environment.yml file
ENV_FILE="python_env.yaml"

# Check if the environment exists by searching for it in the list of conda environments
if conda env list | grep -qw "$ENV_NAME"; then
    echo "Environment $ENV_NAME exists. Recreating..."
    # Remove the existing environment
    conda env remove --name "$ENV_NAME"
    # Create the environment from the file
    conda env create --file "$ENV_FILE"
else
    echo "Environment $ENV_NAME does not exist. Creating..."
    # Create the environment from the file
    conda env create --file "$ENV_FILE"
fi

echo "To activate the $ENV_NAME environment, use:"
echo "conda activate $ENV_NAME"
