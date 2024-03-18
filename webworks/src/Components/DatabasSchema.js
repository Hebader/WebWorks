import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DatabasSchema() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Hämta användare och projekt från backend
    axios.get('http://localhost:3001/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:3001/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/logtime', {
        userId: users[0].id, // Du måste anpassa detta beroende på hur du hanterar användarautentisering
        projectId: projects[0].id, // Anpassa detta beroende på hur du väljer projekt
        duration,
        description
      });

      // Återställ formuläret efter att tiden har loggats
      setDuration('');
      setDescription('');
    } catch (error) {
      console.error('Error logging time:', error);
    }
  };

  return (
    <div className="App">
      <h1>Time Logging</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Project:</label>
          <select>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Duration (hours):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Log Time</button>
      </form>
    </div>
  );
}

export default DatabasSchema;