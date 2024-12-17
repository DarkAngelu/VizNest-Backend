# VizNest Backend

This is the backend for the VizNest project, an interactive data visualization dashboard. The backend is built using Node.js and Express.js.

## Prerequisites

To run this project locally, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

Follow these steps to set up and run the backend locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
```
Replace `<repository-url>` with the URL of your GitHub repository.

### 2. Navigate to the Backend Directory

```bash
cd <backend-folder>
```
Replace `<backend-folder>` with the name of the directory containing the backend code.

### 3. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 4. Start the Server

Run the server in production mode:

```bash
npm start
```

For development mode with live reloading (if `nodemon` is set up), use:

```bash
npm run dev
```

### 5. Access the API

The server will be running at:

```
http://localhost:3000
```

You can access API endpoints via this URL.

## Available Scripts

Here are the npm scripts defined for this project:

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode (if configured).

## File Structure

- **index.js**: Entry point of the application.
- **routes/**: Define API endpoints (if applicable).
- **middleware/**: Contains middleware functions (if applicable).
- **controllers/**: Handles business logic (if applicable).
- **utils/**: Utility functions (if applicable).

## Troubleshooting

- If you encounter issues, ensure you have the correct Node.js and npm versions installed.
- Delete the `node_modules` folder and reinstall dependencies:
  
  ```bash
  rm -rf node_modules
  npm install
  ```
