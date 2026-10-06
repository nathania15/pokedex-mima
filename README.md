# PokéDex Mini

A Pokédex built with **React + Vite + React Router**, powered by [PokéAPI](https://pokeapi.co).

🔗 **Live demo:** https://<your-username>.github.io/pokedex-mima/

## Features

- Browse all 1025 Pokémon with "Load more" pagination
- Live search by name or number, with autocomplete (Enter jumps to the best match)
- Filter by type (18 types) and by your favorites
- Detail page: official artwork, shiny toggle, Pokémon cry, Pokédex entry, height / weight / abilities
- Animated base-stat bars, evolution chain (including branching ones like Eevee)
- ★ Favorites saved in `localStorage`
- 🎲 "Surprise me" random Pokémon, previous / next navigation
- Dark / light mode, responsive layout, loading skeletons, 404 page
- Race-condition-safe data fetching (`isCurrent` guard) and error handling on every request

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. In `vite.config.js`, set `base` to `/<your-repo-name>/`
2. Push the source to GitHub (`git push`)
3. `npm run deploy` (builds, then publishes `dist/` to the `gh-pages` branch)
4. GitHub → Settings → Pages → Source: `gh-pages` branch

## Structure

```
src/
├── App.jsx / main.jsx
├── config.js, utils.js, favorites.js
├── hooks/        usePokemonIndex, usePokemonOfType, useTheme
├── components/   Layout, SearchForm, PokemonList, PokemonCard, TypeBadge, StatBars, EvolutionChain, PokeballIcon
└── pages/        ListPage, DetailPage, NotFoundPage
```
