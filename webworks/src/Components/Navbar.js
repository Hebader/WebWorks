import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

 const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='menu-container'>
            <ul className='nav-links'>
                <li>
                    <Link to='/home' className='nav-link'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/contact' className='nav-link'>
                        Contact
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