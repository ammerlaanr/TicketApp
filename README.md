# Ticket App Monorepo

Deze monorepo bevat een ticketverkoop applicatie met een in-memory backend en een moderne frontend.

## Structuur

- `apps/backend` — Express backend met in-memory data
- `apps/frontend` — React frontend
- `packages/ui` — Herbruikbare UI-componenten 

## Installeren

Om de applicatie te installeren moeten de backend en frontend los van elkaar geinitialiseerd worden. Voer de volgende commando's uit in een Commando Prompt (typ `cmd` nadat het start-menu is geopend) om de applicaties te installeren

### Backend
```
cd <Locatie van de Ticket App-map>/apps/backend
npm install
```

### Frontend
Open een nieuw cmd prompt

```
cd <Locatie van de Ticket App-map>/apps/frontend
npm install
```

## Start de applicaties
De applicaties moeten lokaal gestart worden. Voer in de open Command Prompts (van de Installeren stap) de volgende commando's uit

### Backend
```
npx ts-node-dev src/index.ts
```

### Frontend
```
npm run dev
```
 