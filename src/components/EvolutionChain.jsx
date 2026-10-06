import { Link } from "react-router-dom";
import { formatName, getSpriteUrl, getIdFromUrl } from "../utils.js";

// The API returns a tree (Eevee branches!). Group it by depth so each
// evolution stage becomes one column.
function groupByDepth(node, depth = 0, stages = []) {
  stages[depth] = stages[depth] ?? [];
  stages[depth].push({
    name: node.species.name,
    id: getIdFromUrl(node.species.url),
  });
  node.evolves_to.forEach((child) => groupByDepth(child, depth + 1, stages));
  return stages;
}

function EvolutionChain({ chain, currentName }) {
  const stages = groupByDepth(chain);

  if (stages.length < 2) {
    return <p className="muted">This Pokémon doesn't evolve.</p>;
  }

  return (
    <div className="evo-chain">
      {stages.map((stage, i) => (
        <div key={i} className="evo-stage-wrap">
          {i > 0 && <span className="evo-arrow">→</span>}
          <div className="evo-stage">
            {stage.map((p) => (
              <Link
                key={p.name}
                to={`/pokemon/${p.name}`}
                className={`evo-item ${p.name === currentName ? "is-current" : ""}`}
              >
                <img src={getSpriteUrl(p.id)} alt={p.name} width={72} height={72} loading="lazy" />
                <span>{formatName(p.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvolutionChain;
