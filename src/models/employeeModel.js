const pool = require("../config/db");

const getAllEmployees = async () => {
  const result = await pool.query(
    `SELECT *,
            TO_CHAR(hire_date, 'YYYY-MM-DD') AS hire_date
     FROM employees
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getEmployeeById = async (id) => {
  const result = await pool.query(
    `SELECT *,
            TO_CHAR(hire_date, 'YYYY-MM-DD') AS hire_date
     FROM employees
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const createEmployee = async ({
  first_name,
  last_name,
  email,
  phone,
  department,
  position,
  salary,
  hire_date,
}) => {
  const result = await pool.query(
    `INSERT INTO employees
      (first_name, last_name, email, phone, department, position, salary, hire_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *,
               TO_CHAR(hire_date, 'YYYY-MM-DD') AS hire_date`,
    [
      first_name,
      last_name,
      email,
      phone,
      department,
      position,
      salary,
      hire_date,
    ]
  );

  return result.rows[0];
};

const updateEmployee = async (
  id,
  {
    first_name,
    last_name,
    email,
    phone,
    department,
    position,
    salary,
    hire_date,
  }
) => {
  const result = await pool.query(
    `UPDATE employees
     SET
       first_name = $1,
       last_name = $2,
       email = $3,
       phone = $4,
       department = $5,
       position = $6,
       salary = $7,
       hire_date = $8,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING *,
               TO_CHAR(hire_date, 'YYYY-MM-DD') AS hire_date`,
    [
      first_name,
      last_name,
      email,
      phone,
      department,
      position,
      salary,
      hire_date,
      id,
    ]
  );

  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const result = await pool.query(
    `DELETE FROM employees
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};
const getEmployeeStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*)::int AS total_employees,

      COUNT(*) FILTER (
        WHERE hire_date IS NULL
           OR hire_date <= CURRENT_DATE
      )::int AS active_employees,

      COUNT(*) FILTER (
        WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
      )::int AS new_this_month,

      COUNT(DISTINCT department)::int AS departments

    FROM employees
  `);

  return result.rows[0];
};
const getDepartmentStats = async () => {
  const result = await pool.query(`
    SELECT
      department,
      COUNT(*)::int AS employee_count
    FROM employees
    WHERE department IS NOT NULL
      AND department <> ''
    GROUP BY department
    ORDER BY employee_count DESC, department ASC
  `);

  return result.rows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  getDepartmentStats,
};
