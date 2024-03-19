import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DatabasSchema.css';

function DatabasSchema() {
  const [date, setDate] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Hämta användare, projekt och tidsloggar från backend
    axios
      .get('http://localhost:3001/api/date')
      .then((response) => {
        setDate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3001/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3001/api/timelogs')
      .then((response) => {
        setTimeLogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/logtime', {
        projectId: projects[0].id, // Anpassa detta beroende på hur du väljer projekt
        date,
        duration,
        description,
      });

      // Återställ formuläret efter att tiden har loggats
      setDate('');
      setDuration('');
      setDescription('');
    } catch (error) {
      console.error('Error logging time:', error);
    }
  };

  return (
    <div className="Timelogging">
      {/* Tidloggningsformulär */}
      <div className="TimelogSection">
        <h1>Log Time</h1>
        <div className="timelog-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Project:</label>
              <select>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Date (date):</label>
              <input
                type="date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
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
      </div>

      {/* Databasschema */}
      <div className="DatabaseSection">
        <h1>Database Schema</h1>
        <div className="h3Section">
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          <h3>Projects</h3>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
          {/* Lägg till mer detaljer om projekt om det behövs */}
          <h3>Time Logs</h3>
          <ul>
            {timeLogs.map((log) => (
              <li key={log.id}>
                User: {log.userId}, Project: {log.projectId}, Duration:{' '}
                {log.duration}, Description: {log.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DatabasSchema;
