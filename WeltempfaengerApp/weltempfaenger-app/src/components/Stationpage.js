import { useEffect, useState, useRef } from "react";

const Stationpage = () => {
  const [radioStations, setRadioStations] = useState([]); //useState für die Liste der Radiosender
  const [loading, setLoading] = useState(true); // Zustand für Ladeanzeige

  const [filter, setFilter] = useState({
    countrycode: "",
    language: "",
    tags: "",
  }); //Zustand für das Filterobjekt

  const inputRefs = {
    countrycode: useRef(null),
    language: useRef(null),
    tags: useRef(null),
  }; //Referenzen auf die Input-Fields

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
        //console.log(stationData);

        // Liste der Radiosender in den useState setzen
        setRadioStations(stationData);
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

  //Funktion zum Filtern der Sender nach Namen
  /*const filteredStations = radioStations.filter((station) =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );*/

  //Funktion zum Aktualisieren des Filterobjekts - wird aufgerufen, wenn sich der Wert eines der Eingabefelder ändert
  const handleInputChange = (filterKey) => {
    setFilter({
      ...filter, //Bestehendes Filterobjekt wird kopiert
      [filterKey]: inputRefs[filterKey].current.value, //Der spezifische Filter wird aktualisiert
    });
  };

  //Funktion zum Filtern der Sender basierend auf dem Filterobjekt
  const filteredStations = radioStations.filter((station) => {
    //.filter()-Methode erstellt ein neues Array, das nur die Sender enthält, die die angegebenen Bedingungen erfüllen
    const matchesCountrycode =
      filter.countrycode === "" || station.countrycode === filter.countrycode; //Prüft, ob Countrycode-Feld leer (Sender auch anzeigen, wenn kein Filter gesetzt ist) ist oder mit station.countrycode übereinstimmt
    const matchesLanguage =
      filter.language === "" || station.language === filter.language; //Prüft, ob language-Feld leer ist oder mit station.language übereinstimmt
    const matchesTag = filter.tags === "" || station.tags.includes(filter.tags); //Prüft, ob tags-Feld leer ist oder mit station.tags übereinstimmt
    return matchesCountrycode && matchesLanguage && matchesTag; //Kombiniert die Filter -> Es werden nur die Sender genommen, zu denen alle Filter übereinstimmen
  });

  return (
    <div>
      <h1>List of Radio Stations</h1>
      <input
        type="text"
        placeholder="Countrycode"
        ref={inputRefs.countrycode}
        onChange={() => handleInputChange("countrycode")}
      ></input>
      <input
        type="text"
        placeholder="Language"
        ref={inputRefs.language}
        onChange={() => handleInputChange("language")}
      ></input>
      <input
        type="text"
        placeholder="Tag"
        ref={inputRefs.tags}
        onChange={() => handleInputChange("tags")}
      ></input>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredStations.map((station, index) => (
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
