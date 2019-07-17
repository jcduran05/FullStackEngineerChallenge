import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleLogout, isLoggedIn, isManager }) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a className="logo" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
    </a>
    <div>
      <ul className="navbar-nav">
        {isLoggedIn &&
          isManager && (
            <div className="nav-items-cotaniner">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <Link to="/createpr" className="nav-link">
                  Create PR
                </Link>
              </li>
            </div>
          )}

        {isLoggedIn &&
          !isManager && (
            <div className="nav-items-cotaniner">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <Link to="/readpr" className="nav-link">
                  Read PR
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link">
                  Feedback
                </Link>
              </li>
            </div>
          )}

        {!isLoggedIn && (
          <div className="nav-items-cotaniner">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isManager: state.user.role === 2
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
