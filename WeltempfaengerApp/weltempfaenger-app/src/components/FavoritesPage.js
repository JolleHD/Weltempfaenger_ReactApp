import { useRadio } from "../context/RadioContext";
import "./FavoritesPage.css";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
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
      <div className="headline">
        <h1>Favorites</h1>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((station, index) => (
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
