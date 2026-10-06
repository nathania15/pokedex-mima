import { useState } from "react";
import PokemonCard from "./PokemonCard.jsx";
import { PAGE_SIZE } from "../config.js";

// Receives an already-filtered array and shows it page by page.
// The parent gives this component a `key` that changes with the filters,
// so "how many are visible" resets automatically.
function PokemonList({ pokemons }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (pokemons.length === 0) {
    return (
      <div className="status empty">
        <p className="empty-emoji">🔍</p>
        <p>No Pokémon match your filters.</p>
      </div>
    );
  }

  const shown = pokemons.slice(0, visible);

  return (
    <>
      <ul className="pokemon-grid">
        {shown.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
      {visible < pokemons.length && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="primary-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load more ({pokemons.length - visible} left)
          </button>
        </div>
      )}
    </>
  );
}

export default PokemonList;
