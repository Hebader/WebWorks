import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotionDataReader.css';

const NotionDataReader = () => {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  // Definiera en funktion för att hämta data från Notion via din API-tjänst.
  const fetchDataFromNotion = () => {
    const payload = {
      // Här skulle du lägga till payload-datan som din API-tjänst förväntar sig.
    };

    // Använd axios för att göra ett POST-anrop till din API-tjänst med payload.
    axios
      .post('http://localhost:3001/api/notion/databas1', payload)
      .then((response) => {
        // När anropet lyckas, uppdatera 'data'-state med svaret från API:t.
        setData(response.data);
        console.log('Data fetched from Notion:', response.data);
      })
      .catch((error) => {
        // Logga ett felmeddelande om anropet misslyckas.
        console.error('Error fetching from Notion:', error);
      });
  };

  // Använd useEffect-hook för att hämta data när komponenten monteras.
  // Den tomma beroendearrayen [] gör att detta endast körs en gång.
  useEffect(() => {
    fetchDataFromNotion();
  }, []);

  // Funktion för att uppdatera timespan för ett visst objekt
  const handleUpdateTimespan = (index) => {
    const newData = [...data.results];
    newData[index].properties.Timespan.date.start = updatedData.start;
    newData[index].properties.Timespan.date.end = updatedData.end;
    setData({ results: newData });
    setUpdatedData(null);
  };

  // Rendera ett meddelande medan data laddas eller om ingen data finns att visa.
  if (!data || !Array.isArray(data?.results)) {
    return <p>No data to display...</p>;
  }

  // Rendera en tabell med data från Notion om datan finns.
  return (
    <div>
      <h1 className="mb-4">Notion Data</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Projectname</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Worked hours</th>
              <th>Hours left</th>
              <th>Timespan</th>
              <th>Uppdate time</th> {/* Ny kolumn för att inkludera actions */}
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => {
              const formatDate = (dateString) => {
                try {
                  if (!dateString) return 'Invalid date';

                  const date = new Date(dateString);

                  if (isNaN(date.getTime())) {
                    return 'Invalid date';
                  }

                  return new Intl.DateTimeFormat('sv-SE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(date);
                } catch (error) {
                  console.error('Error parsing date:', error);
                  return 'Invalid date';
                }
              };

              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              return (
                <tr key={index}>
                  <td>
                    {page.properties.Name?.title?.[0]?.plain_text ??
                      'Projectname'}
                  </td>
                  <td>{page.properties.Status?.select?.name ?? 'Status'}</td>
                  <td>{page.properties.Hours?.number ?? 'Hours'}</td>
                  <td>
                    {page.properties['Worked hours']?.rollup?.number ??
                      'Worked hours'}
                  </td>
                  <td>
                    {page.properties.Hoursleft?.formula?.number ?? 'Hours left'}
                  </td>
                  <td>
                    {page.properties.Timespan?.date
                      ? formatDate(page.properties.Timespan.date.start) +
                        ' → ' +
                        formatDate(page.properties.Timespan.date.end)
                      : 'Timespan'}
                  </td>
                  <td>
                    <div className="d-flex">
                      {/* Inmatningsfält för startdatum */}
                      <input
                        type="date"
                        value={updatedData?.start ?? ''}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            start: e.target.value,
                          })
                        }
                      />
                      {/* Inmatningsfält för slutdatum */}
                      <input
                        type="date"
                        value={updatedData?.end ?? ''}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            end: e.target.value,
                          })
                        }
                      />
                      {/* Knapp för att uppdatera timespan */}
                      <button
                        className="btn btn-primary ml-2"
                        onClick={() => handleUpdateTimespan(index)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Exportera komponenten för att kunna användas i andra delar av applikationen.
export default NotionDataReader;
