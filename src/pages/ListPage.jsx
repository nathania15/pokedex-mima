import { useState } from "react";
import SearchForm from "../components/SearchForm.jsx";
import PokemonList from "../components/PokemonList.jsx";
import { usePokemonIndex } from "../hooks/usePokemonIndex.js";
import { usePokemonOfType } from "../hooks/usePokemonOfType.js";
import { useFavorites } from "../favorites.js";
import { TYPE_NAMES, typeColor, capitalize } from "../utils.js";

function ListPage() {
  const { pokemons, isLoading, error } = usePokemonIndex();
  const { favorites } = useFavorites();

  const [query, setQuery] = useState("");
  const [type, setType] = useState(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const typeFilter = usePokemonOfType(type);

  // 1) text search (name or number)
  const q = query.trim().toLowerCase();
  const searchMatches = q
    ? pokemons.filter((p) => p.name.includes(q) || String(p.id) === q)
    : pokemons;

  // 2) type + favorites filters on top of the search
  const filtered = searchMatches.filter(
    (p) =>
      (!typeFilter.names || typeFilter.names.has(p.name)) &&
      (!onlyFavorites || favorites.includes(p.name))
  );

  return (
    <>
      <section className="hero">
        <h2>Gotta find 'em all</h2>
        <p>Browse {pokemons.length || "1000+"} Pokémon, filter by type, and save your favorites.</p>
      </section>

      <SearchForm query={query} onQueryChange={setQuery} matches={searchMatches} />

      <div className="chips" role="group" aria-label="Filters">
        <button
          type="button"
          className={`chip ${onlyFavorites ? "is-active" : ""}`}
          aria-pressed={onlyFavorites}
          onClick={() => setOnlyFavorites((v) => !v)}
        >
          ★ Favorites ({favorites.length})
        </button>
        <span className="chips-divider" />
        {TYPE_NAMES.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip chip-type ${type === t ? "is-active" : ""}`}
            style={{ "--chip-color": typeColor(t) }}
            aria-pressed={type === t}
            onClick={() => setType(type === t ? null : t)}
          >
            {capitalize(t)}
          </button>
        ))}
      </div>

      {isLoading && (
        <ul className="pokemon-grid" aria-busy="true" aria-label="Loading Pokémon">
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className="card skeleton" />
          ))}
        </ul>
      )}

      {error && (
        <p className="status status-error">Couldn't load the list: {error}</p>
      )}

      {typeFilter.error && (
        <p className="status status-error">{typeFilter.error}</p>
      )}

      {!isLoading && !error && (
        typeFilter.isLoading ? (
          <p className="status">Loading {type} Pokémon…</p>
        ) : (
          <>
            <p className="result-count">
              {filtered.length} Pokémon
              {type && ` · ${capitalize(type)} type`}
            </p>
            <PokemonList
              key={`${q}|${type}|${onlyFavorites}`}
              pokemons={filtered}
            />
          </>
        )
      )}
    </>
  );
}

export default ListPage;
