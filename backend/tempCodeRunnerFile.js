const express = require("express");
const cors = require('cors');
const rootRouter = require("./routes/index"); // Fixed typo in the import path

const app = express(); // Initialize the app before using it

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/v1', rootRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
