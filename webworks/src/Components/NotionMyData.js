import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisaNotionDataID() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

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
          databaseId: '7c27b5453a7a49e5b4314926fc51b85d',
          creatorId: '404c02c9-f0a8-43ca-ac91-af63d3e38043'
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
      <h1 className="mb-4">Employee Data</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Total hours</th>
              <th>projects</th>
            </tr>
          </thead>
          <tbody>
            {data.results ? (
              data.results.map((page, index) => (
                <tr key={index}>
                  <td>
                    {page.properties.Name?.title?.[0]?.plain_text?? 'Name'}
                  </td>
                  <td>{page.properties['Total hours']?.rollup?.number ?? 'Total hours'}</td>
                  <td>{page.properties.Project.relation.map((projectRelation) => {     
                      const matchingProject = projects.find(project => project.id === projectRelation.id);     
                      console.log('Matching project:', matchingProject);
                      return (       
                        <span key={projectRelation.id}>        
                          {matchingProject?.properties?.Name?.title[0]?.plain_text ?? ''}      
                        </span>    
                      )   
                    })} 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisaNotionDataID;
