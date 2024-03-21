import React, { useState, useEffect } from "react";
import axios from "axios";
 
// Funktion för att formatera datumobjekt till en läsbar sträng.
function formatDate(dateObject) {
  // Kontrollerar om datumobjektet är definierat och har ett startdatum, annars returneras en tom sträng.
  if (!dateObject || !dateObject.start) return "";
  // Omvandlar datumet till lokalt datumsträngformat.
  return new Date(dateObject.start).toLocaleDateString("sv-SE");
}
 
// Komponent för att visa en enskild tidrapport som en tabellrad (<tr>).
function TimeReport({ report }) {
  return (
    <tr>
      <td>{formatDate(report.properties.Date.date)}</td>
      <td>
        {report.properties.Hours ? report.properties.Hours.number : "N/A"} {/* Visar antal timmar eller "N/A" om inte tillgängligt. */}
      </td>
      <td>{/* Plats för ytterligare data. */}</td>
      <td>{/* Ytterligare kolumner kan läggas till här om nödvändigt. */}</td>
    </tr>
  );
}
 
// Huvudkomponent för att visa tidrapporter hämtade från en server.
function VisaNotionDataID() {
  // State-variabler för att hantera laddningsstatus, felmeddelanden och tidrapporter.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timereports, setTimereports] = useState([]);
 
  // useEffect körs vid komponentens första rendering och hämtar data från servern.
  useEffect(() => {
    const fetchDataCreatedByMe = async () => {
      try {
        const requestBody = {
          databaseId: "e9d6cc1e1cd240a9b7f8c160921358e5",
          privateID: "44444",
        };
        // Använder axios för att göra en POST-förfrågan med requestBody.
        const response = await axios.post(
          "http://localhost:3001/getdatabasebyid",
          requestBody
        );
        // Sätter tidrapporterna i state-variabeln när data har hämtats.
        setTimereports(response.data);
      } catch (error) {
        // Fångar eventuella fel och sätter felmeddelandet i state-variabeln.
        setError(error.message);
      } finally {
        // Sätter isLoading till false när datanhämtningen är klar eller ett fel har inträffat.
        setIsLoading(false);
      }
    };
 
    fetchDataCreatedByMe();
  }, []);
 
  // Visar laddningsindikator om data fortfarande hämtas.
  if (isLoading) return <p>Laddar data...</p>;
  // Visar felmeddelande om ett fel har inträffat vid datanhämtning.
  if (error) return <p>Ett fel uppstod: {error}</p>;
 
  // Renderar tabellen med tidrapporter när data har laddats och inga fel har inträffat.
  return (
    <div>
      <h1 className="mb-4">MyData</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Project</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapper över varje tidrapport och använder TimeReport-komponenten för att visa varje rad. */}
            {timereports.map((report, index) => (
              <TimeReport key={index} report={report} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default VisaNotionDataID;