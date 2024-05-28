// src/RadioKarte.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
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

const RadioKarte = () => {
  const { isError, isLoading, data, error, setCurrentStation } = useRadio();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

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
        <MarkerClusterGroup>
          {data.map(
            (station) =>
              station.geo_lat &&
              station.geo_long && (
                <Marker
                  key={station.stationuuid}
                  position={[station.geo_lat, station.geo_long]}
                  eventHandlers={{
                    click: () => {
                      setCurrentStation(station);
                    },
                  }}
                >
                  <Popup>
                    <div>
                      <h3>{station.name}</h3>
                      <p>{station.country}</p>
                      <p>{station.state}</p>
                      <p>{station.tags}</p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default RadioKarte;
