import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFavoritos } from "../../context/FavoritosContext";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then(async (res) => {
        const results = await Promise.all(
          res.data.results.map((pokemon) => axios.get(pokemon.url))
        );
        setPokemons(results.map((r) => r.data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-400">
        Pokémons
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {pokemons.map((poke) => (
          <div
            key={poke.id}
            className="bg-white text-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 relative"
          >
            <button
              onClick={() => toggleFavorito(poke.id)}
              className={`absolute top-2 right-2 text-2xl ${
                favoritos.includes(poke.id) ? "text-red-500" : "text-gray-300"
              }`}
              title="Favoritar"
            >
              ♥
            </button>

            <Link to={`/detalhes/${poke.id}`} className="text-center">
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-20 h-20 mx-auto"
              />
              <h2 className="mt-3 text-lg font-semibold capitalize text-blue-600">
                {poke.name}
              </h2>
              <p className="text-sm text-gray-600">ID: {poke.id}</p>
              <p className="text-sm text-gray-500">
                Tipo: {poke.types.map((t) => t.type.name).join(", ")}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
