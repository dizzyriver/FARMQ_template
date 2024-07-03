# FARMQ Template

Welcome to the FARMQ project template. This template is designed to help you quickly set up a new project with a React frontend and a FastAPI backend.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (preferably the latest LTS version). [Download Node.js](https://nodejs.org/)
- **Python**: Ensure you have Python installed (preferably the latest version). [Download Python](https://www.python.org/downloads/)

## Project Structure

FARMQ_template/
├── backend/
│ ├── (backend-related files, e.g., requirements.txt, main.py)
├── frontend/
│ ├── package.json
│ └── (other frontend-related files)
├── setup.js
├── package.json
└── README.md

## Steps to Create a New Project

1. Clone the repository:

   ```sh
   git clone <repository-url> your-project-name
   cd your-project-name
   ```

2. Ensure `setup.js` is executable:

   ```sh
   chmod +x setup.js
   ```

3. Run the setup script to update the project name in the `frontend/package.json` file from the root directory:

   ```sh
   npm run setup
   ```

4. Install dependencies for both frontend and backend:

   ```sh
   npm run install:all
   ```

5. Start the development servers:

   - Frontend:

     ```sh
     npm run start:frontend
     ```

   - Backend:

     ```sh
     npm run start:backend
     ```

## Additional Notes

- Make sure to update the project name in any other relevant files (e.g., `README.md`, `.env`, etc.).
- If your project requires specific environment variables, copy `.env.example` to `.env` and fill in the necessary values.
- Customize the template as needed for your project.

## Running Tests

If you have tests set up for your project, you can run them using the following commands:

- Frontend tests:

  ```sh
  cd frontend
  npm test
  ```

- Backend tests:

  ```sh
  cd backend
  # Add command to run backend tests, e.g., pytest
  pytest
  ```

## Node.js Version

This project requires Node.js version 14 or higher. You can specify this in your `package.json` file:

```json
"engines": {
  "node": ">=14.0.0"
}
```
