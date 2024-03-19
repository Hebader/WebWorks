import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Login from '../Pages/Login.js';

const Navbar = () => {
  const isLoggedIn = true;
  return (
    <div className="navbar">
      <div className="menu-container">
        <header>
          <h1>Webworks</h1>
        </header>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>

          <li>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/employees" className="nav-link">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/timereports" className="nav-link">
              Timereports
            </Link>
          </li>
          <li>
            <Link to="/MyData" className="nav-link">
              MyData
              </Link>
           </li>
          <li>
            <Link to="/Timelogging" className="nav-link">
              Timelogging
              </Link>

          
          </li>
        </ul>
        <Login isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};
export default Navbar;
