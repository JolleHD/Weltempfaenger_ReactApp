// src/RadioMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const RadioMap = () => {
  const [currentStation, setCurrentStation] = useState(null);

  const stations = [
    {
      id: 1,
      name: '1Live',
      lat: 51.2266,
      lng: 6.7782,
      url: 'https://wdr-1live-live.icecast.wdr.de/wdr/1live/live/mp3/128/stream.mp3',
    },
    {
      id: 2,
      name: 'Radio Rur',
      lat: 50.8072,
      lng: 6.2824,
      url: 'http://streams.radiork.de/radiorur',
    },
    // Weitere Stationen mit Koordinaten
  ];

  const stationsWithoutCoords = [
    {
      id: 3,
      name: 'Online Radio',
      url: 'http://streaming-url-of-online-radio.com',
    },
    {
      id: 4,
      name: 'Web Radio',
      url: 'http://streaming-url-of-web-radio.com',
    },
    // Weitere Stationen ohne Koordinaten
  ];

  const handlePlay = (url) => {
    setCurrentStation(url);
  };

  return (
    <div>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map(station => (
          <Marker key={station.id} position={[station.lat, station.lng]}>
            <Popup>
              <div>
                <h2>{station.name}</h2>
                <button onClick={() => handlePlay(station.url)}>Play</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ position: 'absolute', top: 10, right: 10, background: 'white', padding: '10px', borderRadius: '5px' }}>
        <h3>Online Radios</h3>
        <ul>
          {stationsWithoutCoords.map(station => (
            <li key={station.id}>
              {station.name} <button onClick={() => handlePlay(station.url)}>Play</button>
            </li>
          ))}
        </ul>
      </div>
      {currentStation && (
        <audio controls autoPlay style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <source src={currentStation} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default RadioMap;
