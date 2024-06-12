import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stationpage from "./components/Stationpage";
import RadioKarte from "./components/RadioKarte";
import { RadioProvider } from "./context/RadioContext";
import '@fortawesome/fontawesome-free/css/all.min.css';


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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // useState für die Sidebar offen / geschlossen

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RadioProvider>
          <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
            <Stationpage />
          </div>
          <div className="map-container">
            <button
              className={`toggle-button ${isSidebarOpen ? "" : "collapsed"}`}
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? "<<" : ">>"}
            </button>
            <RadioKarte />
          </div>
        </RadioProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
