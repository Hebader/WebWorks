import React, {useState} from "react";
import axios from "axios";
import "./Login.css";


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setloginStatus] = useState('');


  const handleLogin = async(e) =>{ 
    e.preventDefault();
    try{
      // const response = await fetch('http://localhost:3001/login', {
      //   method: 'POST', 
      //   headers: {
      //     'Content-Type': 'application/json', 
      //   },
      //   body: JSON.stringify({name, password}),
      // });
      const response = await axios.post('http://localhost:3001/login', {name, password});
      alert (response.data.message);
    }
    catch (error){

      alert('Login misslyckades')
    }
    
    // const data = await response.json();
    // if (response.ok) {
    //   alert('Login lyckades')
    // }
    // else{
    //   alert('Login misslyckades')
    // }
  };
    return(
      <div>
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
    )
  }
  export default Login;