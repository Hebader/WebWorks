import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SlLogin } from 'react-icons/sl';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        name,
        password,
      });
      setLoginStatus(response.data.message);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setShowLoginForm(false);
        alert('login successful');
      } else {
        setIsLoggedIn(false);
        alert('Login failed');
      }
    } catch (error) {
      setIsLoggedIn(false);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus('');
  };

  const handleIconClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLoginForm(true);
    }
  };

  return (
    <div className="login-container">
      {/* Render icon and Logged in message */}
      <div className="login-status">
        {isLoggedIn ? (
          <>
            <span className="span">
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: 'green' }}
              />{' '}
              Logged in
            </span>
            {/* Render logout button */}
            <div className="logout-popup">
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </>
        ) : (
          <span className="span" onClick={handleIconClick}>
            <SlLogin />
            Login
          </span>
        )}
      </div>

      {/* Render login form */}
      {showLoginForm && (
        <div className="login-popup">
          <form onSubmit={handleLogin}>
            <div className="userlogin">
              <label htmlFor="name">Username:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="userlogin">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {loginStatus && <p>{loginStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
