import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotionTimereportsReader = () => {
  const [timereports, setTimereports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timereportsResponse = await axios.post(
          'http://localhost:3001/api/notion/databas3'
        );
        const employeesResponse = await axios.post(
          'http://localhost:3001/api/notion/databas2'
        );
        const projectsResponse = await axios.post(
          'http://localhost:3001/api/notion/databas1'
        );

        setTimereports(timereportsResponse.data.results);
        setEmployees(employeesResponse.data.results);
        setProjects(projectsResponse.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <h1 className="mb-4">Timereports</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Related Employees</th>
              <th>Hours</th>
              <th>Note</th>
              <th>Related Projects</th>
            </tr>
          </thead>
          <tbody>
            {timereports.map((timereport) => (
              <tr key={timereport.id}>
                <td>{timereport.properties.Date.date.start}</td>
                <td>
                  {timereport.properties.EmployeeRelation.relation.map(
                    (employeeRelation) => {
                      const matchedEmployee = employees.find(
                        (employee) => employee.id === employeeRelation.id
                      );

                      return (
                        <span key={matchedEmployee.id}>
                          {matchedEmployee.properties.Name.title[0].plain_text}
                        </span>
                      );
                    }
                  )}
                </td>
                <td>{timereport.properties.Hours.number}</td>
                <td>{timereport.properties.Note.title[0].plain_text}</td>
                <td>
                  {timereport.properties.Project.relation.map(
                    (projectRelation) => {
                      const matchingProject = projects.find(
                        (project) => project.id === projectRelation.id
                      );

                      return (
                        <span key={projectRelation.id}>
                          {matchingProject.properties.Name.title[0].plain_text}
                        </span>
                      );
                    }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          );
        </table>
      </div>
    </div>
  );
};

export default NotionTimereportsReader;
