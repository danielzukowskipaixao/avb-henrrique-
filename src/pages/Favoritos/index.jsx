import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFavoritos } from "../../context/FavoritosContext";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (favoritos.length > 0) {
      Promise.all(
        favoritos.map((id) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        )
      )
        .then((results) => {
          setPokemons(results.map((res) => res.data));
        })
        .catch((err) => console.error(err));
    } else {
      setPokemons([]);
    }
  }, [favoritos]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <Link
        to="/"
        className="inline-block text-white hover:text-yellow-400 transition mb-4"
      >
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">
        Meus Pokémons Favoritos
      </h1>

      {pokemons.length === 0 ? (
        <p className="text-center mt-10">Nenhum favorito ainda.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {pokemons.map((poke) => (
            <Link
              key={poke.id}
              to={`/detalhes/${poke.id}`}
              className="bg-white text-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200"
            >
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-20 h-20"
              />
              <h2 className="mt-3 text-lg font-semibold capitalize text-blue-600">
                {poke.name}
              </h2>
              <p className="text-sm text-gray-600">ID: {poke.id}</p>
              <p className="text-sm text-gray-500">
                Tipo: {poke.types.map((t) => t.type.name).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
