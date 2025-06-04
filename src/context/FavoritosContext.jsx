import { createContext, useContext, useEffect, useState } from "react";

// Criação do contexto
export const FavoritosContext = createContext();

// Hook para facilitar o uso
export const useFavoritos = () => useContext(FavoritosContext);

// Provider
export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}
