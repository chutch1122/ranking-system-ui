# Ranking System UI (Deprecated)

Internal web app for tracking player rankings for office games. This repository is deprecated and kept for historical reference.

A new version is in development using modern tooling and frameworks (for example, Angular 20+ and updated libraries). This codebase targets Angular 5-era dependencies and is no longer actively maintained.


## Overview

Tracks player ratings and recent games for multiple game types (currently Foosball and Ping Pong). Provides leaderboards, player profiles with rating history, and simple forms for adding players and submitting games.


## Features

- Multi-game leaderboards
  - Rank, player name (links to profile), current rating, rating delta (color-coded), and streak indicator
  - Separate leaderboard section per game type
- Player profiles
  - Rating history line chart (aggregated across game types) using ngx-charts
  - Per-game-type stats: current rating, win/loss ratio, and "Most points won against" stat
  - Game history tabs by game type with pagination
- Recent games
  - Grouped by game type
  - Clear win/loss labeling with per-player rating deltas and links to player profiles
- Submissions
  - Game submission: record a doubles match (2v2) by selecting game type and players for winning/losing teams
  - Player submission: add a new player (first/last name)
- Reusable UI elements
  - Numeric stoplight component for positive/negative deltas
  - Streak component with tooltips (e.g., On fire!/Heating up!/Getting cold!/Frozen!)
- Routing and navigation
  - Leaderboards (default), Recent Games, Create Game, Create Player, Player Details pages


## Tech stack (legacy)

- Angular 5.x with Angular CLI 1.7
- Angular Material 5.x and RxJS 5.x
- ngx-charts (D3) for charts; moment.js for date handling
- Nginx for static hosting in production
- Dockerfile for multi-stage build (Node 8 build, Nginx serve)
- Testing: Karma/Jasmine (unit) and Protractor (e2e)


## Backend API

The UI expects a backend REST API. Base URL is configured via environment files:
- Development: http://localhost:8080
- Production: /api (assumes a reverse proxy routes /api to the backend)

Representative endpoints used by the UI:
- POST /games — submit a game
- GET /games/recent/{gameType} — recent games per type
- GET /players — list players
- POST /players — create player
- GET /players/{id} — player details
- GET /players/{id}/games — games by player
- GET /players/{id}/ratings — all ratings by game type
- GET /players/{id}/ratings/{gameType} — ratings for a specific type
- GET /stats/most-points-won-against/{playerId}/{gameType} — stat for player vs. opponent


## Getting started (local)

This project targets Node.js 8-era tooling and Angular CLI 1.7. Running it on modern Node versions may fail. Prefer Docker (below). If you must run locally:

- Install Node 8.x (e.g., via nvm) and npm
- Install dependencies: `npm install`
- Start dev server: `npm start`
- App runs at http://localhost:4200 and expects the API at http://localhost:8080


## Build

- Production build: `npm run build`
- Output is emitted to `dist/`


## Testing

- Unit tests: `npm test`
- End-to-end tests: `npm run e2e`


## Docker

A multi-stage Dockerfile is provided.

- Build image:
  - `docker build -t ranking-system-ui .`
- Run container:
  - `docker run --rm -p 8080:80 ranking-system-ui`
- Open http://localhost:8080

Notes:
- The container serves static files via Nginx. It assumes a reverse proxy provides the backend at `/api`. Adjust Nginx or your deployment to proxy `/api` to the backend service.


## Configuration

- API base URL is set in:
  - `src/environments/environment.ts` (development)
  - `src/environments/environment.prod.ts` (production)
- Supported game types are defined in `src/app/models/game-type.model.ts` (FOOSBALL, PINGPONG)


## Project status

- Deprecated: built with Angular 5 and older dependencies
- Successor: a modern rewrite is in progress (Angular 20+, refreshed UI, updated build/tooling)


## Related

- Legacy API (also deprecated):[ Ranking System API ](https://github.com/chutch1122/ranking-system-api) — backend for this UI


## License

MIT
