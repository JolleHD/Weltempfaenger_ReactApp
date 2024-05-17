import React from "react"; 
const MapApi = () => {
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
  
  