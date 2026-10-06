import { useSyncExternalStore } from "react";

// A tiny external store: every component that calls useFavorites()
// stays in sync, and the list survives page reloads via localStorage.
const KEY = "pokedex-favorites";
const listeners = new Set();

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

let favorites = read();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return favorites;
}

export function toggleFavorite(name) {
  favorites = favorites.includes(name)
    ? favorites.filter((n) => n !== name)
    : [...favorites, name];
  try {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  } catch {
    /* storage unavailable (private mode) — keep it in memory only */
  }
  listeners.forEach((listener) => listener());
}

export function useFavorites() {
  const list = useSyncExternalStore(subscribe, getSnapshot);
  return {
    favorites: list,
    isFavorite: (name) => list.includes(name),
    toggle: toggleFavorite,
  };
}
