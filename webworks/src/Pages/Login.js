import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SlLogin } from 'react-icons/sl';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [privateID, setPrivateID] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setLoggedInUser(loggedInUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        name,
        password,
        privateID
      });
      setLoginStatus(response.data.message);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setShowLoginForm(false);
        setLoggedInUser(name);
        localStorage.setItem('userID', response.data.privateID);
        localStorage.setItem('loggedIn', name);
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
    setLoggedInUser('');
    localStorage.removeItem('loggedIn');
  };

  const handleIconClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLoginForm(true);
    }
  };

  const handleClose = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="login-container">
      {/* Render icon and Logged in message */}
      <div className="login-status">
        {isLoggedIn ? (
          <>
            <span className="loggedInView">
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: 'green' }}
              />{' '}
              Logged in <br />
            </span>
            {/* Render logout button */}
            <div className="logout-popup">
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </>
        ) : (
          <span className="login-button" onClick={handleIconClick}>
            <SlLogin />
            Login
          </span>
        )}
      </div>

      {/* Show logged in user below the logged in message */}
      {isLoggedIn && (
        <div className="logged-in-user">
          <strong>User:</strong> {loggedInUser}
        </div>
      )}

      {/* Render login form */}
      {showLoginForm && (
        <div className="login-popup">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
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
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {loginStatus && <p>{loginStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
