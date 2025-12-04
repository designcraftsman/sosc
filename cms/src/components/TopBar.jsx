import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { BiLogOut, BiUser, BiKey } from "react-icons/bi";
import { MdEmail, MdArticle } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import ChangePasswordModal from './ChangePasswordModal';
import logo from '../assets/logo.gif';

const TopBar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActiveRoute = (path) => {
    if (path === '/articles') {
      return location.pathname.startsWith('/articles');
    }
    return location.pathname === path;
  };

  return (
    <div className="topbar-container d-flex justify-content-between align-items-center px-3 px-md-5 py-2 bg-primary">
      {/* Logo */}
      <div className="d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="rounded-circle"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </div>

      {/* Center Navigation */}
      <nav className="topbar-nav">
        <Link
          to="/messages"
          className={`topbar-nav-link ${isActiveRoute('/messages') ? 'active' : ''}`}
        >
          <MdEmail size={22} />
          <span>Messages</span>
        </Link>
        <Link
          to="/articles"
          className={`topbar-nav-link ${isActiveRoute('/articles') ? 'active' : ''}`}
        >
          <MdArticle size={22} />
          <span>Articles</span>
        </Link>
      </nav>

      {/* User info and actions */}
      <div className="d-flex align-items-center gap-3 position-relative">
        <span className="fw-normal text-white">
          Bienvenue Mr Ahmed !
        </span>

        {/* Settings dropdown */}
        <div className="dropdown topbar-dropdown" ref={dropdownRef}>
          <button
            className={`btn p-0 border-0 bg-transparent settings-button ${showDropdown ? 'active' : ''}`}
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Settings"
          >
            <CiSettings size={30} color="white" />
          </button>

          <div className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`}>
            <div className="dropdown-header">
              <BiUser className="me-2" />
              {user?.email}
            </div>
            <div className="dropdown-divider"></div>
            <button 
              className="dropdown-item d-flex align-items-center"
              onClick={() => {
                setShowChangePassword(true);
                setShowDropdown(false);
              }}
            >
              <BiKey className="me-2" />
              Changer le mot de passe
            </button>
            <div className="dropdown-divider"></div>
            <button 
              className="dropdown-item d-flex align-items-center text-danger"
              onClick={handleLogout}
            >
              <BiLogOut className="me-2" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal 
          onClose={() => setShowChangePassword(false)}
        />
      )}
    </div>
  );
};

export default TopBar;

