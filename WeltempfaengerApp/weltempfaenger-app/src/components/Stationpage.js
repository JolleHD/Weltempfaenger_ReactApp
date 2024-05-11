import { useEffect, useState } from "react";

const Stationpage = () => {
  const [radioList, setRadioList] = useState([]); //useState für die Liste der Radiosender

  //API-Anfrage beim ersten Render
  useEffect(() => {
    //Funktion lädt die Radiosender von der API
    const fetchRadioList = async () => {
      try {
        //GET-Anfrage zur API-URL, Antwort wird in response gespeichert
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
        const baseUrls = data.map((server) => `https://${server.name}`);

        // extrahierte URLs in den useState radioList setzen
        setRadioList(baseUrls);
      } catch (e) {
        // Fehlerbehandlung, falls die Anfrage fehlschlägt
        console.error("Error fetching radio list", e);
      }
    };
    //Funktion zum Laden der Radiosender aufrufen
    fetchRadioList();
  }, []);

  return (
    <div>
      <h1>List of Radio Stations</h1>
      <ul>
        {radioList.map((url, index) => (
          <li key={index}>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stationpage;
