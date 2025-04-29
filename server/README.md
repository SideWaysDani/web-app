# README for the QuietAlpha Server

This is the server component of the QuietAlpha project. It is a simple Node.js application that serves as the backend for the QuietAlpha client.

## Features

- A single route that responds with the application name.

## Getting Started

1. **Install Dependencies**  
   Run the following command to install the necessary dependencies:
   ```
   npm install
   ```

2. **Run the Server**  
   Start the server with the following command:
   ```
   node src/app.js
   ```

3. **Access the Application**  
   Open your browser and navigate to `http://localhost:3000` to see the application name displayed.

## Project Structure

- `src/app.js`: Entry point for the Node.js server.
- `src/routes/index.js`: Contains the route handler for the application name.
- `package.json`: Lists the dependencies and scripts for the server application.

## License

This project is licensed under the MIT License.