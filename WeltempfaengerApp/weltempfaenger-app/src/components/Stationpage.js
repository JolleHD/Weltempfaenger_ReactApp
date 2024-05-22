import { useEffect, useState, useRef } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import fetchStations from "../fetchers/fetchStations.js";

const Stationpage = () => {
  const [filter, setFilter] = useState({
    countrycode: "",
    language: "",
    tags: "",
  }); // Zustand für das Filterobjekt

  const inputRefs = {
    countrycode: useRef(null),
    language: useRef(null),
    tags: useRef(null),
  }; // Referenzen auf die Input-Fields

  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: Infinity,
  }); //useQuery für fetch

  // Funktion zum Aktualisieren des Filterobjekts - wird aufgerufen, wenn sich der Wert eines der Eingabefelder ändert
  const handleInputChange = (filterKey) => {
    setFilter({
      ...filter, // Bestehendes Filterobjekt wird kopiert
      [filterKey]: inputRefs[filterKey].current.value, // Der spezifische Filter wird aktualisiert
    });
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
      {isError ? (
        <p>{error.message}</p>
      ) : isLoading ? (
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
