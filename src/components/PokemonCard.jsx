import { Link } from "react-router-dom";
import { useFavorites } from "../favorites.js";
import { formatName, padId, getArtworkUrl, getSpriteUrl } from "../utils.js";

function PokemonCard({ pokemon }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(pokemon.name);

  return (
    <li className="card">
      <Link to={`/pokemon/${pokemon.name}`} className="card-link">
        <span className="card-id">#{padId(pokemon.id)}</span>
        <img
          className="card-img"
          src={getArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          width={120}
          height={120}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; // avoid an infinite error loop
            e.currentTarget.src = getSpriteUrl(pokemon.id);
          }}
        />
        <span className="card-name">{formatName(pokemon.name)}</span>
      </Link>
      <button
        type="button"
        className={`fav-btn ${fav ? "is-fav" : ""}`}
        aria-pressed={fav}
        aria-label={fav ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
        onClick={() => toggle(pokemon.name)}
      >
        {fav ? "★" : "☆"}
      </button>
    </li>
  );
}

export default PokemonCard;
