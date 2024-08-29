import { useRadio } from "../context/RadioContext";
import "./FavoritesPage.css";
import * as Io5Icons from "react-icons/io5";

const FavoritesPage = () => {
  const {
    favorites,
    setCurrentStation,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useRadio();

  const handleStationClick = (station) => {
    setCurrentStation(station);
  };

  return (
    <div className="favorites-container">
      <h1>Favoriten</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((station, index) => (
            <li className="station-select" key={index} onClick={() => handleStationClick(station)}>
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
                <Io5Icons.IoHeartDislikeOutline
                  className={isFavorite(station) ? "filled" : "unfilled"}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
