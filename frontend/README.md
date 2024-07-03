# React Project Template

This is a FastAPI, React, Mongodb, Qdrant stack project template. (FARMQ)

## Steps to Customize

1. Clone the repository:

   ```sh
   git clone <repository-url> your-project-name
   cd your-project-name
   ```

2. Update the project name and other details in `package.json`:

   ```json
   {
     "name": "your-project-name",
     "version": "1.0.0",
     "description": "Your project description",
     "main": "index.js",
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject"
     },
     "dependencies": {
       // your dependencies here
     },
     "devDependencies": {
       // your dev dependencies here
     },
     "author": "Your Name",
     "license": "MIT"
   }
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Additional Notes

- Make sure to update the project name in any other relevant files (e.g., `README.md`, `.env`, etc.).
- Customize the template as needed for your project.
