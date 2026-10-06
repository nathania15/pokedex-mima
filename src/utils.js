import { SPRITE_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  // url looks like "https://pokeapi.co/api/v2/pokemon/25/"
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// "mr-mime" -> "Mr Mime", "special-attack" -> "Special Attack"
export function formatName(name) {
  return name.split("-").map(capitalize).join(" ");
}

export function padId(id) {
  return String(id).padStart(3, "0");
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getArtworkUrl(id) {
  return `${SPRITE_BASE_URL}/other/official-artwork/${id}.png`;
}

export const TYPE_COLORS = {
  normal: "#a8a77a",
  fire: "#ee8130",
  water: "#6390f0",
  electric: "#f7d02c",
  grass: "#7ac74c",
  ice: "#96d9d6",
  fighting: "#c22e28",
  poison: "#a33ea1",
  ground: "#e2bf65",
  flying: "#a98ff3",
  psychic: "#f95587",
  bug: "#a6b91a",
  rock: "#b6a136",
  ghost: "#735797",
  dragon: "#6f35fc",
  dark: "#705746",
  steel: "#b7b7ce",
  fairy: "#d685ad",
};

export const TYPE_NAMES = Object.keys(TYPE_COLORS);

export function typeColor(type) {
  return TYPE_COLORS[type] ?? "#777";
}
