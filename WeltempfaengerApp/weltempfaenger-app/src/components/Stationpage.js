import { useState } from "react";
import { useRadio } from "../context/RadioContext";
import { countries, languages, tags } from "../utils/filter";

const Stationpage = () => {
  const {
    isError,
    isLoading,
    error,
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
    console.log("Selected station:", station); // Debugging
    setCurrentStation(station); // Setze aktuellen Sender
  };

  const loadMoreStations = () => {
    setVisibleCount((prevCount) => prevCount + 100); // Anzahl der sichtbaren Sender um 100 erhöhen
  };

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  })); // Geht alle Länder, die in filter.js gesetzt sind, durch

  const languageOptions = languages.map((language) => ({
    value: language.code,
    label: language.name,
  })); // Geht alle Sprachen, die in filter.js gesetzt sind, durch

  const tagOptions = tags.map((tag) => ({
    value: tag.code,
    label: tag.name,
  })); // Geht alle tags, die in filter.js gesetzt sind, durch

  return (
    <div className="stationpage">
      <style jsx>{`
        .stationpage {
          padding: 20px;
          height: 100%;
          overflow-y: auto;
        }
        .content {
          margin-bottom: 200px; /* Platz für den fest fixierten Player */
        }
      `}</style>
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
