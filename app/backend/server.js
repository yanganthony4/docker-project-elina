const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
require("dotenv").config();

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable CORS

// Routes
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
