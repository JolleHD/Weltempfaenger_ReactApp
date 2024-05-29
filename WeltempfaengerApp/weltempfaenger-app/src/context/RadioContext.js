import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchStations from "../fetchers/fetchStations.js";

const RadioContext = createContext(); //Context um die Daten vom Radiofetch für alle Komponenten die es benötigen zur Verfügung zu stellen

export const RadioProvider = ({ children }) => {
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: Infinity,
  }); //useQuery für fetch

  const [currentStation, setCurrentStation] = useState(null); //Zum Setzen des aktuellen Senders

  const [filter, setFilter] = useState({
    countrycode: "",
    language: "",
    tags: "",
  }); // Zustand für das Filterobjekt

  // Funktion zum Filtern der Sender basierend auf dem Filterobjekt
  const filteredStations = data
    ? data.filter((station) => {
      // .filter()-Methode erstellt ein neues Array, das nur die Sender enthält, die die angegebenen Bedingungen erfüllen
      const matchesCountrycode =
        filter.countrycode === "" || station.countrycode === filter.countrycode; // Prüft, ob Countrycode-Feld leer (Sender auch anzeigen, wenn kein Filter gesetzt ist) ist oder mit station.countrycode übereinstimmt
      const matchesLanguage =
        filter.language === "" || station.language === filter.language; // Prüft, ob language-Feld leer ist oder mit station.language übereinstimmt
      const matchesTag =
        filter.tags === "" || station.tags.includes(filter.tags); // Prüft, ob tags-Feld leer ist oder mit station.tags übereinstimmt
      return matchesCountrycode && matchesLanguage && matchesTag; // Kombiniert die Filter -> Es werden nur die Sender genommen, zu denen alle Filter übereinstimmen
    })
    : [];

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
        filteredStations,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  return useContext(RadioContext);
};
