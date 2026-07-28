# Resultaten interne kwaliteitscontrole

Testdatum: **28/07/2026**

## Eindresultaat

- **31.309 controles geslaagd**
- **0 fouten**
- **31.000 samengestelde noodplannen** doorgerekend
- **50 Europese landenprofielen** gecontroleerd
- **301 landencontroles** op landnaam, noodnummers, spreektaal en officiële bron
- structuur, interne routes en kritieke procedureteksten gecontroleerd

De combinatiematrix omvat:

`50 landen × 5 gebeurtenissen × 31 combinaties van betrokken zaken × 2 urgentietoestanden × 2 reistoestanden`

Per gegenereerd plan worden ook de zichtbaarheid, het verwachte aantal stappen, de enkelvoud/meervoudtekst en — indien van toepassing — het dringende politienummer gecontroleerd.

## Handmatige browsertests

- gsmformaat: **390 × 844 pixels**
- desktopformaat: **1440 × 1000 pixels**
- landselectie en terug-/home-navigatie
- Belgische noodnummers 101 en 112
- Nederlandse operatorzin voor België
- persoonlijk plan met alle vijf betrokken onderdelen, diefstal, onmiddellijk gevaar en verder reizen
- fout- en waarschuwingslog van de productie-app: geen meldingen

## Gevonden en herstelde punten

1. De tekst “5 betrokken onderdeelen” is gecorrigeerd naar “5 betrokken onderdelen”.
2. Bij onmiddellijk gevaar door diefstal of overval gebruikt een persoonlijk plan nu het landspecifieke politienummer. Voor België is dit 101 in plaats van het algemene nummer 112.
3. De zichtbare simulatieknoppen en simulatiemelding zijn volledig uit de productie-app verwijderd.
4. De onafhankelijke testomgeving controleert voortaan ook de twee bovenstaande regressies.

## Offlinecontrole

De service worker bevat alle lokale productieonderdelen in de vooraf te cachen bestandenlijst. De cacheversie is voor deze uitgave verhoogd naar `reisnoodhulp-v5`, zodat bestaande installaties de vernieuwde app ophalen. Externe websites en kaartdiensten blijven internet vereisen; de lokale noodstappen en opgeslagen appbestanden zijn bedoeld om offline beschikbaar te blijven nadat de app eenmaal online is geladen.

## Afbakening

De simulatie bewijst dat de huidige app-logica intern consistent is met de opgenomen landenprofielen en procedures. Telefoonnummers en overheidsprocedures kunnen later wijzigen. Daarom blijft de inhoudsdatum 01/08/2026 zichtbaar in de app en is periodieke hercontrole bij de officiële bronnen noodzakelijk.
