import "./App.css";
import React, {useEffect} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stationpage from "./components/Stationpage";
import RadioKarte from "./components/RadioKarte";
import { RadioProvider } from "./context/RadioContext";
import FavoritesPage from "./components/FavoritesPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RadioPlayer from "./components/RadioPlayer";
import { useRadio } from "./context/RadioContext";
import { useNavigate } from "react-router-dom";

// Erstelle eine Instanz des QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 Minuten
      cacheTime: 1000 * 60 * 30, // 30 Minuten
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RadioProvider>
          <Router>
            <MainContent />
          </Router>
        </RadioProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

function MainContent() {
  const { isLoading, resetFilter, setScrollMessage } = useRadio(); // Jetzt innerhalb einer Komponente, die vom RadioProvider umschlossen ist - dadurch RadioPlayer und Sidebar erst anzeigen, wenn alles geladen ist (aufgeräumter Ladebildschirm)
  const navigate = useNavigate();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = function(event) {
      console.log("Websocket connection established");
    }
  
    socket.onmessage = function(event) {
      if (event.data === "home_button_pressed") {
        handleHomeButtonPress(); // Diese Funktion wird ausgelöst, wenn der Button gedrückt wird
      } else if (event.data === "scroll down") {
        handleScroll("down"); // Scrollen nach unten
      } else if (event.data === "scroll up") {
        handleScroll("up"); // Scrollen nach oben
      }
    };
  
    socket.onclose = function() {
      console.log("WebSocket connection closed");
    };
  
    return () => {
      socket.close(); // WebSocket-Verbindung schließen, wenn die Komponente unmountet
    };
  }, [navigate]);
  
  const handleHomeButtonPress = () => {
    navigate("/"); // Navigiert zur Startseite (Home)
    console.log("Home Button pressed")
    resetFilter(); //Filter zurücksetzen
  };

  const handleScroll = (direction) => {
    if (direction === "down") {
      setScrollMessage("down");
      console.log("down");
    } else if (direction === "up"){
      window.scrollBy(0, -50);
      setScrollMessage("up");
      console.log("up");
    }
  };

  return (
    <>
      {!isLoading && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" />
          <Route path="/filter" element={<Stationpage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
      <div className="map-container">
        <RadioKarte />
        {!isLoading && <RadioPlayer />}
      </div>
    </>
  );
}

export default App;
