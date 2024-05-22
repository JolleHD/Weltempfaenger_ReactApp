import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stationpage from "./components/Stationpage";
import { useState } from "react";

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
  const [showPage, setShowPage] = useState(true);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <button onClick={() => setShowPage(!showPage)}>Toggle Page</button>
        {showPage && <Stationpage />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
