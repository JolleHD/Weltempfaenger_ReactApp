// Import necessary modules and styles
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import L from "leaflet";
//import mapPlaceholder from "./images/map_placeholder.png"; // Adjust the path if necessary

// Custom icon for markers
/*const customIcon = L.icon({
  iconUrl: mapPlaceholder,
  iconSize: [35, 35],
});*/

function Weltkarte() {

  const position = [50.935173, 6.953101]

  return (
    <div>
      <MapContainer center={[position]} zoom={2} crollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
  //const [userMarker, setUserMarker] = useState(null); 

  /*const handleMapClick = (e) => {
    setUserMarker({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  };*/

  /*function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });*/

    /*return userMarker ? (
      <Marker position={[userMarker.lat, userMarker.lng]} icon={customIcon}>
        <Popup>You placed your marker here!</Popup>
      </Marker>
    ) : null; */
  }

  export default Weltkarte;

