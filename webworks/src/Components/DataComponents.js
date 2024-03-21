import React, { useEffect, useState } from 'react';
 
function DataComponent() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    // Hämta data från servern vid komponentens laddning
    fetch('http://localhost:3001/getdatabasebyid') // Byt ut mot din faktiska server-URL
      .then(response => response.json())
      .then(data => {
        setData(data); // Spara den mottagna datan i state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Den tomma arrayen ser till att effekten endast körs en gång
 
  return (
<div>
<h1>Mottagen Data</h1>
<ul>
        {data.map((item, index) => (
<li key={index}>{item.url} - {item.id}</li> // Exempel på hur data kan visas
        ))}
</ul>
</div>
  );
}
 
export default DataComponent;