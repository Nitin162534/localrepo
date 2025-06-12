# E-Commerce Example

This demo shows a very small e-commerce setup built with Express and MongoDB for the backend and a React frontend.

## Running
1. Install dependencies:
   ```bash
   npm install --ignore-scripts
   ```
2. Start MongoDB locally on the default port `27017`.
3. Start the server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The public folder contains the React app. Products are fetched from `/api/products` and users can register or login.
