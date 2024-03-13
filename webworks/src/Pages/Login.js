import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SlLogin } from 'react-icons/sl';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // State to manage the visibility of the login form

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        name,
        password,
      });
      setLoginStatus(response.data.message); // Update login status based on server response
      if (response.status === 200) {
        setIsLoggedIn(true); // Set isLoggedIn to true if login successful
        setShowLoginForm(false); // Hide login form after successful login
        alert('Login lyckades'); // Show alert for successful login
      } else {
        setIsLoggedIn(false); // Set isLoggedIn to false if login failed
        alert('Login misslyckades');
      }
    } catch (error) {
      setIsLoggedIn(false); // Set isLoggedIn to false if login failed
      alert('Login misslyckades');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false when logging out
    setLoginStatus(''); // Clear login status
    setShowLoginForm(false); // Hide login form
  };

  const handleIconClick = () => {
    if (isLoggedIn) {
      // If logged in, show logout button
      setShowLoginForm(false); // Hide login form
    } else {
      // If logged out, show login form as a popup
      setShowLoginForm(true); // Show login form
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="logged-in-content">
          <button onClick={handleLogout}>Logga ut</button>
        </div>
      ) : (
        // Conditionally render login form based on showLoginForm state
        showLoginForm && (
          <div className="login-popup">
            <form onSubmit={handleLogin}>
              <div className="userlogin">
                <label htmlFor="name">Användarnamn:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="userlogin">
                <label htmlFor="password">Lösenord:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Logga in</button>
            </form>
            {loginStatus && <p>{loginStatus}</p>}
          </div>
        )
      )}
      {/* Render icon */}
      <div className="login-status" onClick={handleIconClick}>
        {isLoggedIn ? (
          <span className="span">
            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />{' '}
            Inloggad
          </span>
        ) : (
          <span className="span">
            <SlLogin />
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
