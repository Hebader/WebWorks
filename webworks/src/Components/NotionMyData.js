import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisaNotionDataID() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timereports, setTimereports] = useState([]);

  useEffect(() => {
    const fetchDataCreatedByMe = async () => {
      try {
        console.log('Fetching timereports');
        const timereportsResponse = await axios.post('http://localhost:3001/api/notion/databas3');
        console.log('Timereports response:', timereportsResponse.data);

        console.log('Fetching employees');
        const employeesResponse = await axios.post('http://localhost:3001/api/notion/databas2');
        console.log('Employees response:', employeesResponse.data);

        console.log('Fetching projects');
        const projectsResponse = await axios.post('http://localhost:3001/api/notion/databas1');
        console.log('Projects response:', projectsResponse.data);

        setProjects(projectsResponse.data.results);
        setEmployees(employeesResponse.data.results);
        
        const requestBody = {
          databaseId: 'e9d6cc1e1cd240a9b7f8c160921358e5',
          creatorId: 'e9e0e319-5b85-4857-9de6-763f3ead77a4'
        };

        console.log('Fetching data from server');
        const response = await fetch('http://localhost:3001/getdatabasebyid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error('Något gick fel vid hämtning av data');

        const data = await response.json();
        console.log('Data from server:', data);
        console.log('Data results:', data.results);
        setData(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataCreatedByMe();
  }, []);

  if (isLoading) return <div>Laddar data...</div>;
  if (error) return <div>Ett fel uppstod: {error}</div>;

  return (
    <div>
      <h1 className="mb-4">MyData</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Total hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {timereports.map((timereport) => (
  <tr key={timereport.id}>
    <td>{timereport.properties.Date.date.start}</td>
    <td>
      {timereport.properties.EmployeeRelation.relation.map((employeeRelation) => {
        const matchedEmployee = employees.find(employee => employee.id === employeeRelation.id);
        return (
          <span key={matchedEmployee.id}>
            {matchedEmployee.properties.Name.title[0].plain_text}
          </span>
        );
      })}
    </td>
    <td>
      {timereport.properties.Project ? (
        timereport.properties.Project.relation.map((projectRelation) => {
          const matchingProject = projects.find(project => project.id === projectRelation.id);

          // Check if the project is active before rendering
          if (matchingProject && matchingProject.properties.Status.select.name === 'Active') {
            return (
              <span key={projectRelation.id}>
                {matchingProject.properties.Name.title[0].plain_text}
              </span>
            );
          } else {
            return null; // Exclude inactive projects from rendering
          }
        })
      ) : (
        <span>No related project</span>
      )}
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisaNotionDataID;
