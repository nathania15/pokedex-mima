import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL, TOTAL_POKEMON } from "../config.js";
import { formatName, padId, typeColor } from "../utils.js";
import { useFavorites } from "../favorites.js";
import TypeBadge from "../components/TypeBadge.jsx";
import StatBars from "../components/StatBars.jsx";
import EvolutionChain from "../components/EvolutionChain.jsx";

function DetailPage() {
  const { name } = useParams();
  // `state.name` records which URL param the data belongs to, so
  // "loading" is simply "the data on hand isn't for this URL yet".
  const [state, setState] = useState({ name: null });

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/pokemon/${encodeURIComponent(name.toLowerCase())}`
        );

        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }

        const pokemon = await response.json();

        // Species + evolution chain are "nice to have": if they fail,
        // the page still renders with what we already have.
        let species = null;
        let chain = null;
        try {
          const speciesRes = await fetch(pokemon.species.url);
          if (speciesRes.ok) {
            species = await speciesRes.json();
            if (species.evolution_chain) {
              const chainRes = await fetch(species.evolution_chain.url);
              if (chainRes.ok) chain = (await chainRes.json()).chain;
            }
          }
        } catch {
          /* optional data — ignore */
        }

        if (isCurrent) setState({ name, pokemon, species, chain, error: null });
      } catch (err) {
        if (isCurrent) {
          const message =
            err instanceof TypeError
              ? "Couldn't reach PokéAPI. Check your connection and try again."
              : err.message;
          setState({ name, error: message });
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  const { pokemon } = state;

  useEffect(() => {
    if (!pokemon) return;
    document.title = `${formatName(pokemon.name)} · PokéDex Mini`;
    return () => {
      document.title = "PokéDex Mini";
    };
  }, [pokemon]);

  if (state.name !== name) {
    return <p className="status">Loading {name}…</p>;
  }
  if (state.error) {
    return (
      <div className="status">
        <p className="status-error">{state.error}</p>
        <Link to="/" className="back-link">← Back to list</Link>
      </div>
    );
  }

  return (
    <PokemonDetail
      key={pokemon.id}
      pokemon={pokemon}
      species={state.species}
      chain={state.chain}
    />
  );
}

function PokemonDetail({ pokemon, species, chain }) {
  const [shiny, setShiny] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(pokemon.name);

  const types = pokemon.types.map((t) => t.type.name);
  const artwork = pokemon.sprites.other["official-artwork"];
  const image =
    (shiny ? artwork.front_shiny : artwork.front_default) ??
    pokemon.sprites.front_default;

  const flavor = species?.flavor_text_entries
    .filter((e) => e.language.name === "en")
    .at(-1)
    ?.flavor_text.replace(/[\f\n\r]+/g, " ");
  const genus = species?.genera.find((g) => g.language.name === "en")?.genus;

  function playCry() {
    const url = pokemon.cries?.latest ?? pokemon.cries?.legacy;
    if (url) {
      const audio = new Audio(url);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  }

  return (
    <article
      className="detail-page"
      style={{ "--accent": typeColor(types[0]) }}
    >
      <div className="detail-nav">
        <Link to="/" className="back-link">← Back to list</Link>
        <div className="prev-next">
          {pokemon.id > 1 && (
            <Link to={`/pokemon/${pokemon.id - 1}`}>‹ #{padId(pokemon.id - 1)}</Link>
          )}
          {pokemon.id < TOTAL_POKEMON && (
            <Link to={`/pokemon/${pokemon.id + 1}`}>#{padId(pokemon.id + 1)} ›</Link>
          )}
        </div>
      </div>

      <section className="detail-hero">
        <button
          type="button"
          className={`fav-btn fav-btn-lg ${fav ? "is-fav" : ""}`}
          aria-pressed={fav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={() => toggle(pokemon.name)}
        >
          {fav ? "★" : "☆"}
        </button>
        <img
          className="detail-img"
          src={image}
          alt={pokemon.name}
          width={260}
          height={260}
        />
        <p className="detail-id">#{padId(pokemon.id)}</p>
        <h2>{formatName(pokemon.name)}</h2>
        {genus && <p className="muted">{genus}</p>}
        <div className="type-row">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
        <div className="hero-actions">
          <button type="button" className="icon-btn" onClick={playCry}>
            🔊 Cry
          </button>
          <button
            type="button"
            className={`icon-btn ${shiny ? "is-active" : ""}`}
            aria-pressed={shiny}
            onClick={() => setShiny((s) => !s)}
          >
            ✨ Shiny
          </button>
        </div>
      </section>

      {flavor && <p className="flavor">“{flavor}”</p>}

      <section className="panel">
        <h3>About</h3>
        <dl className="facts">
          <div>
            <dt>Height</dt>
            <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
          </div>
          <div>
            <dt>Weight</dt>
            <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
          </div>
          <div>
            <dt>Abilities</dt>
            <dd>
              {pokemon.abilities
                .map((a) => formatName(a.ability.name) + (a.is_hidden ? " (hidden)" : ""))
                .join(", ")}
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <h3>Base stats</h3>
        <StatBars stats={pokemon.stats} />
      </section>

      {chain && (
        <section className="panel">
          <h3>Evolution</h3>
          <EvolutionChain chain={chain} currentName={species?.name ?? pokemon.name} />
        </section>
      )}
    </article>
  );
}

export default DetailPage;
