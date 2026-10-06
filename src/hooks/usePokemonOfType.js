import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config.js";

// Returns the set of Pokémon names that belong to `type` (e.g. "fire").
// Pass null for "no type filter".
export function usePokemonOfType(type) {
  const [result, setResult] = useState({ type: null, names: null, error: null });

  useEffect(() => {
    if (!type) return;
    let isCurrent = true;

    fetch(`${API_BASE_URL}/type/${type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Couldn't load the ${type} type (${response.status}).`);
        }
        return response.json();
      })
      .then((data) => {
        if (isCurrent) {
          setResult({
            type,
            names: new Set(data.pokemon.map((p) => p.pokemon.name)),
            error: null,
          });
        }
      })
      .catch((err) => {
        if (isCurrent) setResult({ type, names: null, error: err.message });
      });

    return () => {
      isCurrent = false;
    };
  }, [type]);

  const isReady = Boolean(type) && result.type === type;
  return {
    names: isReady ? result.names : null,
    error: isReady ? result.error : null,
    isLoading: Boolean(type) && !isReady,
  };
}
