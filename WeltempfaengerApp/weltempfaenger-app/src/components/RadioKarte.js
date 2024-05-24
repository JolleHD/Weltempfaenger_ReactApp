// src/RadioKarte.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRadio } from "../context/RadioContext";

// Fix the default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
//Radio-browser Api nutzt
const RadioKarte = () => {
  const {
    isError,
    isSuccess,
    isLoading,
    data,
    error,
    currentStation,
    setCurrentStation,
  } = useRadio();

  //Leaflet Map
  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {data.map(
          (station) =>
            station.geo_lat &&
            station.geo_long && (
              <Marker
                key={station.stationuuid}
                position={[station.geo_lat, station.geo_long]}
              >
                <Popup>
                  <div>
                    <h3>{station.name}</h3>
                    <p>{station.country}</p>
                    <p>{station.state}</p>
                    <p>{station.tags}</p>
                    <br />
                    <button onClick={() => setCurrentStation(station)}>
                      Play
                    </button>
                    <a
                      href={station.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen
                    </a>
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default RadioKarte;
