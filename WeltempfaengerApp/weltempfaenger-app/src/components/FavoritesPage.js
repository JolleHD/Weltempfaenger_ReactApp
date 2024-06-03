import { useRadio } from "../context/RadioContext";

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
    <div>
      <h1>Favorites</h1>
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
                onClick={() =>
                  isFavorite(station)
                    ? removeFavorite(station)
                    : addFavorite(station)
                }
              >
                {isFavorite(station) ? "❤️" : "♡"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
