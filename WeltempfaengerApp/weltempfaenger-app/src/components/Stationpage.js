import { useEffect, useState } from "react";

const Stationpage = () => {
  const [radioStations, setRadioStations] = useState([]); //useState für die Liste der Radiosender
  const [loading, setLoading] = useState(true); // Zustand für Ladeanzeige

  //API-Anfrage beim ersten Render
  useEffect(() => {
    const fetchRadioStations = async () => {
      try {
        // Zufällige Basis-URL des Radioservers abrufen
        const randomBaseUrl = await getRadiobrowserBaseUrlRandom();

        // Konfiguration des ausgewählten Servers abrufen
        const config = await getRadiobrowserServerConfig(randomBaseUrl);

        // Liste der verfügbaren Sender abrufen
        const stationResponse = await fetch(`${randomBaseUrl}/json/stations`);

        // Überprüfen, ob die Anfrage erfolgreich war
        if (!stationResponse.ok) {
          throw new Error("Network response was not ok");
        }

        // JSON-Daten aus der Antwort extrahieren
        const stationData = await stationResponse.json();

        // Begrenze die Anzahl der Radiosender auf 10
        const limitedStations = stationData.slice(0, 10);

        // Liste der Radiosender in den useState setzen
        setRadioStations(limitedStations);
        setLoading(false); // Ladeanzeige ausblenden, wenn Daten geladen sind
      } catch (error) {
        console.error("Error fetching radio stations", error);
        setLoading(false); // Ladeanzeige ausblenden, wenn ein Fehler auftritt
      }
    };

    // Funktion zum Laden der Radiosender aufrufen
    fetchRadioStations();
  }, []);

  // Funktion, um eine zufällige Basis-URL des Radioservers abzurufen
  async function getRadiobrowserBaseUrlRandom() {
    //Fetch zur API-URL, Antwort wird in response gespeichert
    const response = await fetch(
      "http://all.api.radio-browser.info/json/servers"
    );

    // Überprüfen, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // JSON-Daten aus der Antwort extrahieren
    const data = await response.json();

    // Basis-URLs extrahieren und formatieren
    const hosts = data.map((server) => `https://${server.name}`);
    return hosts[Math.floor(Math.random() * hosts.length)];
  }

  // Funktion, um die Konfiguration des Radioservers abzurufen
  async function getRadiobrowserServerConfig(baseurl) {
    const response = await fetch(`${baseurl}/json/config`);

    // Überprüfen, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // JSON-Daten aus der Antwort extrahieren und zurückgeben
    return await response.json();
  }

  return (
    <div>
      <h1>List of Radio Stations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {radioStations.map((station, index) => (
            <li key={index}>
              <a href={station.url}>{station.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stationpage;
