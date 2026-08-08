function Header() {
  return (
    <header className="header">
      <div>
        <p className="breadcrumb">Workspace / Dashboard</p>
        <h1>Dashboard</h1>
      </div>

      <div className="header-actions">
        <button className="icon-button" aria-label="Notifications">
          🔔
        </button>

        <div className="profile">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
          <span className="chevron">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
