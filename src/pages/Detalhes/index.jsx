import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Detalhes() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pokemon) return <p className="text-white p-4">Carregando...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Botão de voltar */}
      <Link
        to="/"
        className="inline-block text-white hover:text-yellow-400 transition mb-4"
      >
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300 capitalize">
        {pokemon.name}
      </h1>

      <div className="bg-white text-gray-800 max-w-md mx-auto rounded-xl shadow-lg p-6">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <p className="mt-4">
          <strong>ID:</strong> {pokemon.id}
        </p>
        <p>
          <strong>Altura:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Peso:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>Tipo(s):</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Habilidades:</strong>{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
