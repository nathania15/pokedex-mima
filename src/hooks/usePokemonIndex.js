import { useState, useEffect } from "react";
import { API_BASE_URL, TOTAL_POKEMON } from "../config.js";
import { getIdFromUrl } from "../utils.js";

// One request for the whole Pokédex (names + ids only, ~60 KB),
// cached for the session. Search, filtering and "load more" then
// all happen instantly in the browser.
let indexPromise = null;

function fetchIndex() {
  if (!indexPromise) {
    indexPromise = fetch(`${API_BASE_URL}/pokemon?limit=${TOTAL_POKEMON}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) =>
        data.results.map((p) => ({
          name: p.name,
          id: Number(getIdFromUrl(p.url)),
        }))
      )
      .catch((err) => {
        indexPromise = null; // allow a retry next time
        throw err;
      });
  }
  return indexPromise;
}

export function usePokemonIndex() {
  const [state, setState] = useState({
    pokemons: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isCurrent = true;

    fetchIndex()
      .then((pokemons) => {
        if (isCurrent) setState({ pokemons, isLoading: false, error: null });
      })
      .catch((err) => {
        if (isCurrent) {
          setState({ pokemons: [], isLoading: false, error: err.message });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return state;
}
