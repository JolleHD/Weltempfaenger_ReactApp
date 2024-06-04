import { useState } from "react";
import { useRadio } from "../context/RadioContext";
import { countries, languages, tags } from "../utils/filter";
import "./StationPage.css"; // Hier importierst du die CSS-Datei

const Stationpage = () => {
  const {
    isError,
    isLoading,
    error,
    currentStation,
    setCurrentStation,
    filter,
    setFilter,
    filteredStations,
  } = useRadio();

  const [visibleCount, setVisibleCount] = useState(100); // Anzahl der anfangs sichtbaren Sender

  const handleSelectChange = (event, filterKey) => {
    setFilter({
      ...filter,
      [filterKey]: event.target.value,
    });
    setVisibleCount(100);
  }; // Aktualisiert bei Änderungen der Filter die passenden Stationen

  const handleStationClick = (station) => {
    setCurrentStation(station); //Setze aktuellen Sender
  };

  const loadMoreStations = () => {
    setVisibleCount((prevCount) => prevCount + 100); // Anzahl der sichtbaren Sender um 100 erhöhen
  };

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  })); //Geht alle Länder, die in filter.js gesetzt sind, durch

  const languageOptions = languages.map((language) => ({
    value: language.code,
    label: language.name,
  })); //Geht alle Sprachen, die in filter.js gesetzt sind, durch

  const tagOptions = tags.map((tag) => ({
    value: tag.code,
    label: tag.name,
  })); //Geht alle tags, die in filter.js gesetzt sind, durch

  return (
    <div className="stationpage">
      <style jsx>{`
        /* Muss noch in extra CSS Datei, am besten Komponente noch weiter aufteilen */
        .stationpage {
          padding: 20px;
          height: 100%;
          overflow-y: auto;
        }

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
