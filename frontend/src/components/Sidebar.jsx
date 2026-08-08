function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">E</div>
        <div>
          <h2>EmployeeHub</h2>
          <span>Management System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a href="/" className="nav-item active">
          <span>▣</span>
          Dashboard
        </a>

        <a href="/employees" className="nav-item">
          <span>♙</span>
          Employees
        </a>

        <a href="/departments" className="nav-item">
          <span>▦</span>
          Departments
        </a>

        <a href="/reports" className="nav-item">
          <span>▤</span>
          Reports
        </a>

        <a href="/settings" className="nav-item">
          <span>⚙</span>
          Settings
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-box">
          <strong>Need help?</strong>
          <p>Check the documentation or contact your administrator.</p>
          <button>View Help</button>
        </div>

        <div className="sidebar-user">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
