import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import EmployeeTable from "../components/EmployeeTable";

function Dashboard() {
  const [stats, setStats] = useState({
    total_employees: 0,
    active_employees: 0,
    departments: 0,
    new_this_month: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch employee statistics
        const statsResponse = await fetch(
          "http://localhost:3000/api/employees/stats",
          {
            headers,
          }
        );

        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
          throw new Error(
            statsData.message || "Failed to load dashboard statistics"
          );
        }

        setStats(statsData.data);

        // Fetch department statistics
        const departmentsResponse = await fetch(
          "http://localhost:3000/api/employees/departments/stats",
          {
            headers,
          }
        );

        const departmentsData = await departmentsResponse.json();

        if (!departmentsResponse.ok) {
          throw new Error(
            departmentsData.message ||
              "Failed to load department statistics"
          );
        }

        setDepartments(departmentsData.data || []);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err);

        setError(
          err.message || "Unable to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <Header />

        <section className="dashboard-content">
          <div className="welcome-section">
            <div>
              <h2>Welcome back, Admin User 👋</h2>

              <p>
                Here's what's happening with your organization today.
              </p>
            </div>

            <button className="primary-button">
              + Add Employee
            </button>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="stats-grid">
            <StatCard
              title="Total Employees"
              value={
                loading ? "..." : stats.total_employees
              }
              change="Live"
              icon="👥"
              description="From employee database"
            />

            <StatCard
              title="Active Employees"
              value={
                loading ? "..." : stats.active_employees
              }
              change="Live"
              icon="✓"
              description="Currently active"
            />

            <StatCard
              title="Departments"
              value={
                loading ? "..." : stats.departments
              }
              change="Live"
              icon="▦"
              description="Across the organization"
            />

            <StatCard
              title="New This Month"
              value={
                loading ? "..." : stats.new_this_month
              }
              change="Live"
              icon="↗"
              description="Employees added this month"
            />
          </div>

          <div className="content-grid">
            <EmployeeTable />

            <div className="department-card">
              <div className="card-heading">
                <div>
                  <h2>Departments</h2>
                  <p>Employee distribution</p>
                </div>
              </div>

              <div className="department-list">
                {loading ? (
                  <div className="table-message">
                    Loading departments...
                  </div>
                ) : departments.length === 0 ? (
                  <div className="table-message">
                    No departments found.
                  </div>
                ) : (
                  departments.map((department) => (
                    <div
                      className="department-row"
                      key={department.department}
                    >
                      <div className="department-name">
                        <span className="department-dot blue"></span>

                        {department.department}
                      </div>

                      <strong>
                        {department.employee_count}
                      </strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
