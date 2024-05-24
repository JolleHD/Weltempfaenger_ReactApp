import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchStations from "../fetchers/fetchStations.js";

const RadioContext = createContext(); //

export const RadioProvider = ({ children }) => {
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: Infinity,
  }); //useQuery für fetch

  const [currentStation, setCurrentStation] = useState(null);

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
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  return useContext(RadioContext);
};
