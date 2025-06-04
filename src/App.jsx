import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { FavoritosProvider } from "./context/FavoritosContext";

function App() {
  return (
    <FavoritosProvider>
      <AppRoutes />
    </FavoritosProvider>
  );
}

export default App;
