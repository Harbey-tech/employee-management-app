const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Management API",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
    service: "employee-management-api",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Employee routes
app.use("/api/employees", employeeRoutes);

module.exports = app;
