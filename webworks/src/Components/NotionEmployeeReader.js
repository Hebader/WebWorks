import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./NotionDataReader.css";

const NotionEmployeeReader = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataFromNotion = () => {
    const payload = {
      // Fill in the necessary payload data.
    };

    axios
      .post('http://localhost:3001/api/notion', payload)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log('Data fetched from Notion:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from Notion:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromNotion();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (!data || !Array.isArray(data.results)) {
    return <p>No data to display.</p>;
  }

  return (
    <div>
      <h1 className="mb-4">Employee Data</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Total hours</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => (
              <tr key={index}>
                <td>
                  {page.properties.Name?.title?.[0]?.plain_text ?? 'Name'}
                </td>
                <td>{page.properties['Total hours']?.rollup?.number ?? 'Total hours'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotionEmployeeReader;