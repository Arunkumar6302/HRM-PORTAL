import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logoUrl, setLogoUrl] = React.useState('/logo.avif');

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  React.useEffect(() => {
    let active = true;
    import('../services/settingsService').then(({ getWebsiteSettings }) => {
       getWebsiteSettings().then(res => {
         if (active && res.success && res.data?.logoUrl) {
            setLogoUrl(res.data.logoUrl);
         }
       }).catch(() => {});
    });
    return () => { active = false; };
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo" aria-label="Shnoor Home" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logoUrl} alt="Company Logo" style={{ height: '48px', objectFit: 'contain' }} />
            shnoor
          </Link>

          <button
            type="button"
            className="hamburger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '×' : '☰'}
          </button>

          <nav className={`nav-links${mobileOpen ? ' open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Home
            </NavLink>
            <a href="/#about" className="nav-link">
              About Us
            </a>
            <a href="/#features" className="nav-link">
              Features
            </a>
            <a href="/#pricing" className="nav-link">
              Pricing
            </a>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          <div className="nav-right">
            <div className="nav-dropdown-wrapper" style={{ position: 'relative' }}>
              <button className="btn btn-outline" style={{ marginLeft: 'auto' }}>
                Register <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: 4 }}></i>
              </button>
              <div className="nav-dropdown-content">
                <Link to="/register/admin" className="dropdown-item">
                  <i className="fas fa-user-shield"></i>
                  <div className="dropdown-item-text">
                    <strong>Administrator</strong>
                    <span>Manage platform & settings</span>
                  </div>
                </Link>
                <Link to="/register/manager" className="dropdown-item">
                  <i className="fas fa-user-tie"></i>
                  <div className="dropdown-item-text">
                    <strong>Manager</strong>
                    <span>Team & Trial Access</span>
                  </div>
                </Link>
              </div>
            </div>
            <Link to="/login" className="btn btn-solid">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className={`nav-mobile-backdrop${mobileOpen ? ' open' : ''}`} role="presentation" onClick={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;

