import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stationpage from "./components/Stationpage";
import RadioKarte from "./components/RadioKarte";
import { RadioProvider } from "./context/RadioContext";
import FavoritesPage from "./components/FavoritesPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RadioPlayer from "./components/RadioPlayer";

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
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" />
                <Route path="/filter" element={<Stationpage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </div>
            <div className="map-container">
              <RadioKarte />
              <RadioPlayer />
            </div>
          </Router>
        </RadioProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
