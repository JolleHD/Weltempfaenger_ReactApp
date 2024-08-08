import "./App.css";
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
  const { isLoading } = useRadio(); // Jetzt innerhalb einer Komponente, die vom RadioProvider umschlossen ist - dadurch RadioPlayer und Sidebar erst anzeigen, wenn alles geladen ist (aufgeräumter Ladebildschirm)

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
