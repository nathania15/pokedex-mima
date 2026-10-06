import { useState } from "react";
import { useNavigate } from "react-router-dom";

// `query` / `onQueryChange` are controlled by ListPage so the grid below
// can filter live while the user types. `matches` are the current
// search results, used for autocomplete and for "Enter jumps to best match".
function SearchForm({ query, onQueryChange, matches }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim().toLowerCase();

    if (name === "") {
      setError("Type a Pokémon name first.");
      return;
    }

    setError(null);
    const exact = matches.find((p) => p.name === name || String(p.id) === name);
    const target = exact ?? matches[0];
    navigate(`/pokemon/${target ? target.name : name}`);
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setError(null);
          }}
          placeholder="Search by name or number…"
          className="search-input"
          list="pokemon-suggestions"
          aria-label="Search Pokémon"
          autoComplete="off"
        />
        <datalist id="pokemon-suggestions">
          {query.trim() &&
            matches.slice(0, 8).map((p) => <option key={p.name} value={p.name} />)}
        </datalist>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="status status-error">{error}</p>}
    </div>
  );
}

export default SearchForm;
