import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  };


    return (
      <div className="login-container">
        {isLoggedIn ? (
          <div className="logged-in-content">
            <button onClick={handleLogout}>Logga ut</button>
          </div>
        ) : (
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="name">Användarnamn:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
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
        )}
        <div className="login-status">
          {isLoggedIn ? (
            <span>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />{' '}
              Inloggad
            </span>
          ) : (
            <span>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ color: 'red' }}
              />{' '}
              Utloggad
            </span>
          )}
        </div>
      </div>
    );;
};

export default Login;
