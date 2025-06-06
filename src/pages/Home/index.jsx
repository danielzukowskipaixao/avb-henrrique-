import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

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
          <PokemonCard key={poke.id} poke={poke} />
        ))}
      </div>
    </div>
  );
}
