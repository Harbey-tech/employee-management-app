import { useState } from "react";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLogin) {
        onLogin(data.user);
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-brand">
          <div className="brand-icon">E</div>

          <div>
            <h2>EmployeeHub</h2>
            <span>Management System</span>
          </div>
        </div>

        <div className="login-message">
          <span className="login-label">EMPLOYEE MANAGEMENT</span>

          <h1>
            Manage your
            <br />
            <strong>team smarter.</strong>
          </h1>

          <p>
            A centralized workspace for managing employees,
            departments, and organizational information.
          </p>

          <div className="login-feature">
            <div>✓</div>
            <span>Secure employee management</span>
          </div>

          <div className="login-feature">
            <div>✓</div>
            <span>Real-time organization insights</span>
          </div>

          <div className="login-feature">
            <div>✓</div>
            <span>Centralized employee records</span>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div className="login-form-card">
          <div className="mobile-brand">
            <div className="brand-icon">E</div>
            <strong>EmployeeHub</strong>
          </div>

          <div className="login-heading">
            <span>WELCOME BACK</span>
            <h1>Sign in to your account</h1>
            <p>
              Enter your credentials to access the employee dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <button type="button">Forgot password?</button>
              </div>

              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="login-footer">
            Employee Management System
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
