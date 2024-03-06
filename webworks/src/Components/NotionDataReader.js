import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotionDataReader = () => {
  const [data, setData] = useState(null);

  // Definiera en funktion för att hämta data från Notion via din API-tjänst.
  const fetchDataFromNotion = () => {
    const payload = {
      // Här skulle du lägga till payload-datan som din API-tjänst förväntar sig.
    };

    // Använd axios för att göra ett POST-anrop till din API-tjänst med payload.
    axios
      .post('http://localhost:3001/api/notion', payload)
      .then((response) => {
        // När anropet lyckas, uppdatera 'data'-state med svaret från API:t.
        setData(response.data);
        console.log('Data hämtad från Notion:', response.data);
      })
      .catch((error) => {
        // Logga ett felmeddelande om anropet misslyckas.
        console.error('Fel vid hämtning från Notion:', error);
      });
  };

  // Använd useEffect-hook för att hämta data när komponenten monteras.
  // Den tomma beroendearrayen [] gör att detta endast körs en gång.
  useEffect(() => {
    fetchDataFromNotion();
  }, []);

  // Rendera ett meddelande medan data laddas eller om ingen data finns att visa.
  if (!data || !Array.isArray(data?.results)) {
    return <p>Laddar data eller ingen data att visa...</p>;
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
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => {
              const formatDate = (dateString) => {
                const date = new Date(dateString);
                // Exempel: 'sv-SE' för Svenska
                return new Intl.DateTimeFormat('sv-SE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(date);
              };
              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              return (
                <tr key={index}>
                  <td>
                    {page.properties.Projectname?.title?.[0]?.plain_text ?? 'Projectname'}
                  </td>
                  <td>
                    {page.properties.Status?.select?.name ?? 'Status'}
                  </td>
                  <td>{page.properties.Hours?.number ?? 'Hours'}</td>
                  <td>{page.properties['Hours left']?.formula?.number ?? 'Hours left'}</td>
                  <td>{page.properties['Workedhours']?.rollup?.number ?? 'Worked hours'}</td>
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
