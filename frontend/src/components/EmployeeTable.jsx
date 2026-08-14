import { useEffect, useState } from "react";

function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          "/api/employees",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch employees"
          );
        }

        setEmployees(data.data || []);
      } catch (err) {
        console.error("EMPLOYEE FETCH ERROR:", err);
        setError(
          err.message || "Unable to load employees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-table-card">
      <div className="card-heading">
        <div>
          <h2>Recent Employees</h2>
          <p>Latest employees added to the organization</p>
        </div>

        <button className="primary-button">
          + Add Employee
        </button>
      </div>

      {loading && (
        <div className="table-message">
          Loading employees...
        </div>
      )}

      {error && (
        <div className="table-message login-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {employees.length === 0 ? (
            <div className="table-message">
              No employees found.
            </div>
          ) : (
            <>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.slice(0, 5).map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">
                              {getInitials(
                                employee.first_name,
                                employee.last_name
                              )}
                            </div>

                            <div>
                              <strong>
                                {employee.first_name}{" "}
                                {employee.last_name}
                              </strong>

                              <span>
                                {employee.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          {employee.position || "—"}
                        </td>

                        <td>
                          {employee.department || "—"}
                        </td>

                        <td>
                          <span className="status active">
                            Active
                          </span>
                        </td>

                        <td>
                          <button className="more-button">
                            •••
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <span>
                  Showing {Math.min(employees.length, 5)} of{" "}
                  {employees.length} employees
                </span>

                <button className="secondary-button">
                  View All Employees →
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default EmployeeTable;
