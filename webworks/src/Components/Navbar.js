import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

 const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='menu-container'>
        <header>
          <h1>Webworks</h1>
        </header>
            <ul className='nav-links'>
                <li>
                    <Link to='/' className='nav-link'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/contact' className='nav-link'>
                        Contact
                    </Link>
                </li>
             
                <li>
                    <Link to='/projects' className='nav-link'>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to='/employees' className='nav-link'>
                        Employees
                    </Link>
                </li>
                
                <li>
                    <Link to='/login' className='nav-link'>
                        Login
                    </Link>
                </li>
            
               
            </ul>
        </div>
    </div>
);
};
export default Navbar;