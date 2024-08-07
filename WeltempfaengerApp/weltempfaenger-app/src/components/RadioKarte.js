// src/RadioKarte.js
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useRadio } from "../context/RadioContext";
import * as LuIcons from "react-icons/lu";
import ReactDOMServer from "react-dom/server";
import "./RadioKarte.css";

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

// Create a custom icon using LuRadioTower from react-icons
const customIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <div className="radioicon-border">
      <LuIcons.LuRadioTower style={{ color: "#060b26", fontSize: "24px" }} />
    </div>
  ),
  className: "custom-marker-radioicon",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const MapUpdater = () => {
  const { mapView } = useRadio();
  const map = useMap();

  useEffect(() => {
    if (mapView) {
      map.flyTo(mapView.coords, mapView.zoom);
    }
  }, [mapView, map]);

  return null;
};

const RadioKarte = () => {
  const { isError, isLoading, error, setCurrentStation, filteredStations } =
    useRadio(); //Custom Hook useRadio, damit werden die Sender gefetcht und der aktuelle Sender gesetzt

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-text">Weltempfänger</div>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  if (isError) return <p>{error.message}</p>;

  //Leaflet Map
  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false} // Deaktivieren der Zoom-Steuerelemente
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MapUpdater />
        <MarkerClusterGroup>
          {filteredStations.map(
            (station) =>
              station.geo_lat &&
              station.geo_long && (
                <Marker
                  key={station.stationuuid}
                  position={[station.geo_lat, station.geo_long]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setCurrentStation(station);
                    },
                  }}
                ></Marker>
              )
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default RadioKarte;
