import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchStations from "../fetchers/fetchStations.js";
import { countries } from "../utils/filter.js";

const RadioContext = createContext(); //Context um die Daten vom Radiofetch für alle Komponenten die es benötigen zur Verfügung zu stellen

//RadioProvider, um Radiodaten und an Kindkomponenten zu geben
export const RadioProvider = ({ children }) => {
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["stations"], //Eindeutiger query key zum cachen und aktualisieren
    queryFn: fetchStations, //Funktion um die Daten zu fetchen
    staleTime: Infinity, //Daten werden unendlich lange als "fresh" angesehen (außer Seite wird neu geladen)
  }); //useQuery für fetch

  const [currentStation, setCurrentStation] = useState(null); //Zum Setzen des aktuellen Senders

  const [filter, setFilter] = useState({
    countrycode: "",
    language: "",
    tags: "",
  }); // Zustand für das Filterobjekt

  const [scrollMessage, setScrollMessage] = useState(""); //Setzen der Scroll-Nachricht 

  const resetFilter = () => { //Filter Zurücksetzen (Für Home Button)
    setFilter({
      countrycode: '',
      language: '',
      tags: '',
    });
  };



  const initialMapView = {
    //Ursprüngliche Kartenansicht
    coords: [0, 0],
    zoom: 2,
  };

  const [mapView, setMapView] = useState(initialMapView); // Zustand für Kartenmitte

  //useState für die Liste der Favoritensender
  const [favorites, setFavorites] = useState(() => {
    //Man bekommt die Favoriten aus dem localStorage, wenn welche vorhanden sind, ansonsten ein leeres Array
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  //Speichert die aktualisierte Favoritenliste im localStorage
  const updateLocalStorage = (newFavorites) => {
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  //Hinzufügen eines Senders zur Favoritenliste
  const addFavorite = (station) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, station]; //neue Station zu den alten hinzufügen
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  //Entfernen eines Senders von der Favoritenliste
  const removeFavorite = (station) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.stationuuid !== station.stationuuid
      );
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  //Funktion zum Überprüfen, ob sich eine Station schon in der Favoritenliste befindet
  const isFavorite = (station) => {
    return favorites.some((fav) => fav.stationuuid === station.stationuuid);
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

  useEffect(() => {
    //Zum einstellen der Coordinaten des ausgewählten Landes
    const selectedCountry = countries.find(
      (country) => country.code === filter.countrycode
    );
    if (selectedCountry && selectedCountry.coords) {
      setMapView({ coords: selectedCountry.coords, zoom: 5 });
    } else {
      setMapView(initialMapView);
    }
  }, [filter.countrycode]);

  return (
    <RadioContext.Provider
      value={{
        isError,
        isSuccess,
        isLoading,
        data,
        error,
        currentStation,
        setCurrentStation,
        filter,
        setFilter,
        resetFilter,
        filteredStations,
        scrollMessage,
        setScrollMessage,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        mapView,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  return useContext(RadioContext);
};
