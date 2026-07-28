# Reisnoodhulp voor Belgen

Compacte, installeerbare webapp met praktische noodstappen voor Belgische reizigers in 50 Europese landen.

## Publiceren

De volledige map kan in de hoofdmap of in een submap van een bestaande GitHub-repository worden geplaatst. Alle koppelingen, app-iconen en offlinebestanden gebruiken relatieve paden.

Activeer daarna GitHub Pages voor die repository en open de map waarin `index.html` staat. De uiteindelijke link heeft gewoonlijk deze vorm:

`https://gebruikersnaam.github.io/repositorynaam/mapnaam/`

## Installeren op een gsm

### Android

1. Open de webapp in Chrome.
2. Tik op het browsermenu.
3. Kies **App installeren** of **Toevoegen aan startscherm**.

### iPhone

1. Open de webapp in Safari.
2. Tik op de deelknop.
3. Kies **Zet op beginscherm**.

De webapp opent daarna met een eigen app-icoon en zonder gewone browserbalk.

## Belangrijk

Auteur: **Freddy Sleeuwaert**

Contacten, telefoonnummers en procedures hebben inhoudsdatum **01/08/2026**. Deze gegevens kunnen later wijzigen. Controleer bij twijfel altijd de officiële bron die in de app wordt vermeld.

## Projectindeling

- `index.html`: volledige webapp
- `manifest.webmanifest`: installatiegegevens en app-iconen
- `service-worker.js`: offline-cache
- `assets/`: iconen en app-afbeeldingen
- `qa/`: interne simulatie- en regressietests
- `CONTACTCONTROLE.md`: controle van telefoonnummers en officiële bronnen
