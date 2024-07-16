#!/bin/bash
# Print current working directory
echo "Current working directory: $(pwd)"

# Add the parent directory of backend to PYTHONPATH
export PYTHONPATH="${HOME}/development/repositories/delve"
echo "PYTHONPATH: $PYTHONPATH"

# Set the path to the .env file
export ENV_FILE_PATH="${PYTHONPATH}/.env"
echo "ENV_FILE_PATH: $ENV_FILE_PATH"

# Run Uvicorn with reloader, ensuring PYTHONPATH is inherited
echo "Running Uvicorn with reloader..."
PYTHONPATH="${PYTHONPATH}" uvicorn backend.main:app --reload --log-level debug --env-file "$ENV_FILE_PATH"