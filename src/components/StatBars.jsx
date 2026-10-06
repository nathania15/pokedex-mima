const LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function barColor(value) {
  if (value < 50) return "#e5534b";
  if (value < 80) return "#e5a03a";
  if (value < 110) return "#5bb450";
  return "#2fa8d8";
}

function StatBars({ stats }) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <ul className="stat-list">
      {stats.map((s) => (
        <li key={s.stat.name} className="stat-row">
          <span className="stat-name">{LABELS[s.stat.name] ?? s.stat.name}</span>
          <span className="stat-value">{s.base_stat}</span>
          <span className="stat-track">
            <span
              className="stat-fill"
              style={{
                "--w": `${Math.min((s.base_stat / 160) * 100, 100)}%`,
                background: barColor(s.base_stat),
              }}
            />
          </span>
        </li>
      ))}
      <li className="stat-row stat-total">
        <span className="stat-name">Total</span>
        <span className="stat-value">{total}</span>
      </li>
    </ul>
  );
}

export default StatBars;
