const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes"); // Ensure this file exists and is correctly implemented
const bodyParser = require("body-parser");
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();
const PORT = process.env.PORT || 4000;

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if connection fails
  });

// Middleware for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/firm',firmRoutes)
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));


// Test route
app.get("/home", (req, res) => {
  res.send("<h1>Welcome to Suby</h1>");
});

// Vendor routes
app.use("/vendor", vendorRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started and running at port ${PORT}`);
});
