const express = require("express");
const { body, param, validationResult } = require("express-validator");

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  getDepartmentStats,
} = require("../controllers/employeeController");

const authenticateToken = require("../middleware/auth");

const router = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

// All employee routes require authentication
router.use(authenticateToken);

// Get all employees
router.get("/", getEmployees);

// Get employee statistics
router.get("/stats", getEmployeeStats);

// Get department statistics
router.get("/departments/stats", getDepartmentStats);

// Get one employee
router.get(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("Employee ID must be a positive integer"),
  validateRequest,
  getEmployee
);

// Create employee
router.post(
  "/",
  [
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required"),

    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required"),

    body("email")
      .isEmail()
      .withMessage("A valid email is required"),

    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required"),

    body("position")
      .trim()
      .notEmpty()
      .withMessage("Position is required"),

    body("salary")
      .isFloat({ min: 0 })
      .withMessage("Salary must be a positive number"),
  ],
  validateRequest,
  createEmployee
);

// Update employee
router.put(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Employee ID must be a positive integer"),

    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required"),

    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required"),

    body("email")
      .isEmail()
      .withMessage("A valid email is required"),

    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required"),

    body("position")
      .trim()
      .notEmpty()
      .withMessage("Position is required"),

    body("salary")
      .isFloat({ min: 0 })
      .withMessage("Salary must be a positive number"),
  ],
  validateRequest,
  updateEmployee
);

// Delete employee
router.delete(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("Employee ID must be a positive integer"),
  validateRequest,
  deleteEmployee
);

module.exports = router;
