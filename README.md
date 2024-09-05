# Internet of Things

> Om dit project te runnen is er Docker nodig. Installeer Docker via [deze link](https://www.docker.com/get-started/).

<p>Voor de module Internet of Things moet ik een server component project gaan opstellen.
Ik heb besloten een chat applicatie te maken met WebSockets, waarbij de server en client beide in aparte docker containers draaien.</p>

Om de applicatie op te starten voer het volgende commando uit vanuit de root folder van het proejct ```docker-composer up --build -d```

- De client draait op: http://localhost:3000
- De server draait op: http://localhost:3001 (Hier is niks zichtbaar)


## Extra componenten
- Database opzetten
- Tabel bijhouden met gebruikers
- Tabel bijhouden met berichten van gebruikers