import { useEffect, useState } from "react";
import axios from "axios"; //axios Modul für HTTP-Anfragen

const Stationpage = () => {
  const [radioList, setRadioList] = useState([]); //Zustand für die Liste der Radiosender

  //API-Anfrage beim ersten Render
  useEffect(() => {
    //Funktion lädt die Radiosender von der API
    async function fetchRadioList() {
      try {
        //GET-Anfrage zur API-URL, Antwort wird in response gespeichert
        const response = await axios.get(
          "http://all.api.radio-browser.info/json/servers"
        );
        //Basis-URLs der Antort werden extrahiert und formatiert
        const baseUrls = response.data.map(
          (server) => "https://${server.name}"
        );
        //Die extrahierten URLs werden in den UseState radioList gesetzt
        setRadioList(baseUrls);
      } catch (error) {
        //Fehlerbehandlung, falls die Anfrage fehlschlägt
        console.error("Error fetching radio list", error);
      }
    }
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
