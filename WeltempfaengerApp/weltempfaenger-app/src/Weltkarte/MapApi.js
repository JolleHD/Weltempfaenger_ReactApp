import React from "react"; 
import { MapContainer,
  TileLayer, Marker, Popup } from 'react-leaflet';
// src/api/radio.js
import axios from 'axios';

export const fetchRadioStations = async () => {
  try {
    const response = await axios.get('https://de1.api.radio-browser.info/json/stations');
    return response.data;
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    return [];
  }
};


/*const MapApi = () => {

  return(

    <div>


      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '200px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
        <Marker position={[51.505, -0.09]}>
          <Popup>
            Beispielmarker <br /> Einfache Popup-Nachricht.
          </Popup>
        </Marker>
     </MapContainer> 
      
    </div>
  )
 
  
}*/
export default MapApi;