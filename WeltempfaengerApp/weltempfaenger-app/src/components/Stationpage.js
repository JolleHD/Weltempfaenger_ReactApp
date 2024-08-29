import { useState, useEffect, useRef } from "react";
import { useRadio } from "../context/RadioContext";
import { countries, languages, tags } from "../utils/filter";
import "./Stationpage.css";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";

const Stationpage = () => {
  const {
    isError,
    isLoading,
    error,
    setCurrentStation,
    filter,
    setFilter,
    filteredStations,
    addFavorite,
    removeFavorite,
    isFavorite,
    scrollMessage,
    setScrollMessage,
  } = useRadio();

  const [visibleCount, setVisibleCount] = useState(100); // Anzahl der anfangs sichtbaren Sender
  const [selectedIndex, setSelectedIndex] = useState(0); // Index des ausgewählten Elements
  const containerRef = useRef(null);

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

  const handleScroll = () => {
    //Überprüft ob das Ende des Scrollbaren Bereichs erreicht ist
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreStations();
      }
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll); //EventListener zum Überwachen des Scrollens
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleCount, filteredStations]);

  useEffect(() => {
    if (scrollMessage === "down" && selectedIndex < filteredStations.length -1){
      setSelectedIndex((prevIndex) => prevIndex + 1);
    } else if (scrollMessage === "up" && selectedIndex > 0){
      setSelectedIndex((prevIndex) => prevIndex - 1);
    } else if (scrollMessage === "select") {
      const selectedStation = filteredStations[selectedIndex];
      handleStationClick(selectedStation);
    }
    setScrollMessage(""); //Scroll Message zurücksetzen
  }, [scrollMessage, setScrollMessage, selectedIndex, filteredStations.length]);

  useEffect(() => {
    if (containerRef.current) {
      const selectedItem = containerRef.current.querySelector(
        `.station-select:nth-child(${selectedIndex + 1})`
      );
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }

   
  }, [selectedIndex]);
  
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
    <div className="stationpage" ref={containerRef}>
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
                <li className={`station-select ${
                  index === selectedIndex ? "selected" : ""
                }`} key={index} onClick={() => handleStationClick(station)}>
                  <button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Stationpage;
