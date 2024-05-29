import { useState } from "react";
import { useRadio } from "../context/RadioContext";
import { countries, languages } from "../utils/filter";

const Stationpage = () => {
  const { isError, isLoading, data, error, currentStation, setCurrentStation } =
    useRadio();
  const [filter, setFilter] = useState({
    countrycode: "",
    language: "",
    tags: "",
  }); // Zustand für das Filterobjekt
  const [visibleCount, setVisibleCount] = useState(100); // Anzahl der anfangs sichtbaren Sender

  const handleSelectChange = (event, filterKey) => {
    setFilter({
      ...filter,
      [filterKey]: event.target.value,
    });
    setVisibleCount(100);
  };

  const handleStationClick = (station) => {
    setCurrentStation(station); //Setze aktuellen Sender
  };

  // Funktion zum Filtern der Sender basierend auf dem Filterobjekt
  const filteredStations = data
    ? data.filter((station) => {
        // .filter()-Methode erstellt ein neues Array, das nur die Sender enthält, die die angegebenen Bedingungen erfüllen
        const matchesCountrycode =
          filter.countrycode === "" ||
          station.countrycode === filter.countrycode; // Prüft, ob Countrycode-Feld leer (Sender auch anzeigen, wenn kein Filter gesetzt ist) ist oder mit station.countrycode übereinstimmt
        const matchesLanguage =
          filter.language === "" || station.language === filter.language; // Prüft, ob language-Feld leer ist oder mit station.language übereinstimmt
        const matchesTag =
          filter.tags === "" || station.tags.includes(filter.tags); // Prüft, ob tags-Feld leer ist oder mit station.tags übereinstimmt
        return matchesCountrycode && matchesLanguage && matchesTag; // Kombiniert die Filter -> Es werden nur die Sender genommen, zu denen alle Filter übereinstimmen
      })
    : [];

  const loadMoreStations = () => {
    setVisibleCount((prevCount) => prevCount + 100); // Anzahl der sichtbaren Sender um 100 erhöhen
  };

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const languageOptions = languages.map((language) => ({
    value: language.code,
    label: language.name,
  }));

  const tagOptions = [
    { value: "", label: "All Tags" },
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
    // Add more tags as needed
  ];

  return (
    <div>
      <style jsx>{`
        /* Muss noch in extra CSS Datei, am besten Komponente noch weiter aufteilen */
        .fixed-player {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #fff; /* Hintergrundfarbe, um den Player hervorzuheben */
          z-index: 1000; /* Stellt sicher, dass der Player über anderen Elementen liegt */
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .content {
          margin-bottom: 200px; /* Platz für den fest fixierten Player */
        }
      `}</style>
      {currentStation && (
        <div className="fixed-player">
          <h2>Now Playing: {currentStation.name}</h2>
          <audio controls src={currentStation.url} autoPlay>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <div className="content">
        <h1>List of Radio Stations</h1>
        <select
          value={filter.countrycode}
          onChange={(event) => handleSelectChange(event, "countrycode")}
        >
          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={filter.language}
          onChange={(event) => handleSelectChange(event, "language")}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={filter.tags}
          onChange={(event) => handleSelectChange(event, "tags")}
        >
          {tagOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isError ? (
          <p>{error.message}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {filteredStations.slice(0, visibleCount).map((station, index) => (
                <li key={index}>
                  <button onClick={() => handleStationClick(station)}>
                    {station.name}
                  </button>
                </li>
              ))}
            </ul>
            {visibleCount < filteredStations.length && (
              <button onClick={loadMoreStations}>Load More</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stationpage;
