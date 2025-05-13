# Opstarten van de applicatie

Na alle [installaties](Installatie.md) en imports, is het tijd om de applicatie te starten. 

## Backend

De volgorde waarin de applicaties worden opgestart maakt niet uit. We beginnen nu met de backend, omdat zonder deze de frontend geen waarde heeft.
De backend bevindt zich in `apps/backend`. Om de backend op te starten moeten de volgende commando's in een Terminal (Ctrl+Shift+`) uitgevoerd worden:

```
cd .\apps\backend
npm install
npx ts-node-dev src/index.ts
```

NOTE: `npm install` hoeft enkel de eerste keer uitgevoerd te worden.

Als de backend goed is opgestart, wordt de volgende tekst getoond: `Backend draait op http://localhost:4000`

## Frontend

De frontend wordt op een soortgelijke manier opgestart. Open een tweede Terminal (het plus-teken rechts van de Terminal). Voer hier de volgende commando's in uit:

```
cd .\apps\frontend
npm install
npm run dev
```

NOTE: Ook hier hoeft `npm install` enkel de eerste keer uitgevoerd te worden.

Als de frontend goed is op gestart wordt de volgende tekst getoond:

```
> frontend@0.0.0 dev
> vite


  VITE v6.3.5  ready in 429 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```