import { useState } from "react";
import { useRadio } from "../context/RadioContext";
import { countries, languages, tags } from "../utils/filter";
import "./Stationpage.css";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";

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
    addFavorite,
    removeFavorite,
    isFavorite,
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
      <div className="content">
        <h1>Radiosender</h1>
        <div className="filters">
          <select
            className="filter-select"
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
            className="filter-select"
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
            className="filter-select"
            value={filter.tags}
            onChange={(event) => handleSelectChange(event, "tags")}
          >
            {tagOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
                  <button
                    className="favorite-button"
                    onClick={() =>
                      isFavorite(station)
                        ? removeFavorite(station)
                        : addFavorite(station)
                    }
                  >
                    <HeartIcon
                      className={isFavorite(station) ? "filled" : "unfilled"}
                    />
                  </button>
                </li>
              ))}
            </ul>
            {visibleCount < filteredStations.length && (
              <div className="load-more-button-container">
                <button className="load-more-button" onClick={loadMoreStations}>
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stationpage;
