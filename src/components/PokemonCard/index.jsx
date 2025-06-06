import { Link } from "react-router-dom";
import { useFavoritos } from "../../context/FavoritosContext";

export default function PokemonCard({ poke }) {
  const { favoritos, toggleFavorito } = useFavoritos();

  return (
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
  );
}
