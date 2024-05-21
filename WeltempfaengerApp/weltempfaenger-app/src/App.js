import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Stationpage from "./components/Stationpage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Stationpage />
      </QueryClientProvider>
    </div>
  );
}

export default App;
