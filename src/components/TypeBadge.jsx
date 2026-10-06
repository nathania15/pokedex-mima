import { typeColor, capitalize } from "../utils.js";

function TypeBadge({ type }) {
  return (
    <span className="type-badge" style={{ background: typeColor(type) }}>
      {capitalize(type)}
    </span>
  );
}

export default TypeBadge;
