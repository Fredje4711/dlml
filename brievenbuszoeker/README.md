# Europese brievenbuszoeker

Een zelfstandige, mobielgerichte webpagina waarmee openbare brievenbussen in Europa kunnen worden gezocht.

## Gebruik

- Kies **Gebruik mijn huidige locatie** en sta locatiegebruik toe.
- De toepassing toont maximaal de twee dichtstbijzijnde resultaten. Zo blijft de keuze overzichtelijk en is er een praktisch alternatief wanneer de eerste brievenbus niet meer aanwezig of bereikbaar blijkt.
- **Bekijk autoroute** opent in Google Maps eerst het routeoverzicht, met het gebruikte zoekpunt als vertrek en de brievenbus als bestemming. De gebruiker kiest daarna zelf wanneer de navigatie wordt gestart.
- Geeft de kaart geen bruikbaar resultaat, probeer dan later opnieuw of controleer de officiële website of app van de plaatselijke postdienst.

De toepassing toont alleen openbare postbussen voor uitgaande brieven. Organisatie- of klantenbrievenbussen, zoals die van een ziekenfonds, worden uit de resultaten gefilterd. Lichtingstijden worden niet getoond omdat deze kaartinformatie niet overal actueel of volledig is. Een algemene Google Maps-zoekopdracht wordt niet als alternatief aangeboden, omdat Google Maps openbare brievenbussen kan vermengen met postkantoren, pakjespunten en pakjesautomaten. Google Maps wordt alleen gebruikt om de route naar een reeds gevonden brievenbus te openen.

## Publiceren

Plaats `index.html` in een map op een website of GitHub Pages. Voor betrouwbare automatische locatiebepaling en kaartaanvragen moet de pagina via een beveiligd `https://`-adres worden geopend. Bij het rechtstreeks openen van het bestand vanaf een computer kunnen sommige browsers externe kaartaanvragen blokkeren. Er is geen installatie of account nodig.

De gepubliceerde toepassing staat op:

`https://fredje4711.github.io/dlml/brievenbuszoeker/`

## Installeren als web-app

### Android met Google Chrome

1. Open de toepassing in Chrome.
2. Open het menu met de drie puntjes.
3. Kies **Toevoegen aan startscherm** of **Installeren en snelkoppeling maken**.
4. Kies **Installeren** en volg de aanwijzingen.

### iPhone met Safari

1. Open de toepassing in Safari.
2. Kies **Delen** en vervolgens **Zet op beginscherm**.
3. Schakel indien zichtbaar **Open als web-app** in.
4. Kies **Voeg toe**.

Bij het eerste gebruik vraagt de browser toestemming om de locatie te gebruiken. Kies bij voorkeur de optie waarmee de browser de toestemming voor volgende bezoeken onthoudt, bijvoorbeeld **Toestaan tijdens bezoeken aan deze site** of **Toestaan bij elk bezoek**. De toepassing bewaart de locatie niet.

De startpagina en vormgeving worden lokaal bewaard zodat de web-app opnieuw kan openen wanneer de verbinding tijdelijk wegvalt. Voor actuele brievenbusgegevens en Google Maps-routes is internet nodig.

## Gegevens en privacy

De brievenbuslocaties komen uit OpenStreetMap. De toepassing bewaart geen locatie- of zoekgegevens. Een gekozen locatie wordt alleen gebruikt om de kaartdiensten te raadplegen. OpenStreetMap-gegevens kunnen gewijzigd, onvolledig of verouderd zijn; controleer de brievenbus daarom ter plaatse.
