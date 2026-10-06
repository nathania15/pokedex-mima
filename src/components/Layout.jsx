import { Outlet, Link, useNavigate } from "react-router-dom";
import PokeballIcon from "./PokeballIcon.jsx";
import { useTheme } from "../hooks/useTheme.js";
import { TOTAL_POKEMON } from "../config.js";

function Layout() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  function goRandom() {
    const id = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    navigate(`/pokemon/${id}`);
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-title-link">
          <PokeballIcon size={36} className="logo" />
          <h1>PokéDex Mini</h1>
        </Link>
        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={goRandom}>
            🎲 <span className="hide-sm">Surprise me</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        Data from{" "}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
          PokéAPI
        </a>{" "}
        · Built with React + Vite
      </footer>
    </div>
  );
}

export default Layout;
