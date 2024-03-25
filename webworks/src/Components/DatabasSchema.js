import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DatabasSchema.css';

function DatabasSchema() {
  const [date, setDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [hours, setHours] = useState('');
  const [note, setNote] = useState('');
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [timeReports, setTimeReports] = useState([]);

  useEffect(() => {
    // Hämta projekt från backend vid komponentens montering
    axios
      .get('http://localhost:3001/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Hämta anställda från backend vid komponentens montering
    axios
      .get('http://localhost:3001/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Funktion för att skicka tidrapport till backend
  const logTime = async () => {
    try {
      const selectedProjectName = projects.find(
        (project) => project.id === projectId
      )?.name;
      const selectedEmployeeName = employees.find(
        (employee) => employee.id === employeeId
      )?.name;

      setSelectedProject(selectedProjectName);
      setSelectedEmployee(selectedEmployeeName);

      const response = await axios.post('http://localhost:3001/api/logtime', {
        project: projectId,
        employee: employeeId,
        date: date,
        hours: hours,
        note: note,
      });

      const newTimeReport = {
        project: selectedProjectName,
        employee: selectedEmployeeName,
        date: date,
        hours: hours,
        note: note,
      };

      console.log('Response from server:', response);

      setMessage('Time logged successfully!');
      // Återställ formuläret efter att tiden har loggats
      setTimeReports([...timeReports, newTimeReport]);
      setProjectId('');
      setEmployeeId('');
      setDate('');
      setHours('');
      setNote('');
    } catch (error) {
      console.error('Error logging time:', error);
      setMessage('Failed to log time. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera om alla fält är ifyllda
    if (!projectId || !employeeId || !date || !hours || !note) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Anropa logTime-funktionen för att skicka tidrapporten till backend
    await logTime();
  };

  return (
    <div className="Timelogging">
      {/* Tidloggningsformulär */}
      <div className="TimelogSection">
        <h1>Log Time</h1>
        {message && <p>{message}</p>}
        <div className="timelog-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Project:</label>
              <select onChange={(e) => setProjectId(e.target.value)}>
                <option value="">Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Employee:</label>
              <select onChange={(e) => setEmployeeId(e.target.value)}>
                <option value="">Select employee...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Date (date):</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>Hours:</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div>
              <label>Note:</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button type="submit">Log Time</button>
          </form>
        </div>
      </div>

      {/* Databasschema */}
      <div className="DatabaseSection">
        {/* Visa den senaste tidrapporten endast om "Time logged successfully!" meddelande visas */}
        {message === 'Time logged successfully!' && (
          <div>
            <h1>New timereport logged:</h1>
            <p>Project: {selectedProject}</p>
            <p>Employee: {selectedEmployee}</p>
            <p>Date: {date}</p>
            <p>Hours: {hours}</p>
            <p>Note: {note}</p>
          </div>
        )}
        {/* Visa alla tidigare tidrapporter */}
        <h3>Previous time logs:</h3>
        {timeReports.map((report, index) => (
          <div key={index}>
            <p>Project: {report.project}</p>
            <p>Employee: {report.employee}</p>
            <p>Date: {report.date}</p>
            <p>Hours: {report.hours}</p>
            <p>Note: {report.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatabasSchema;
