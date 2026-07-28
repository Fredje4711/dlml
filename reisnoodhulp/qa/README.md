# Interne simulatieomgeving

Deze map is uitsluitend bedoeld voor kwaliteitscontrole en hoort niet in het zip-pakket voor eindgebruikers.

## Wat wordt getest?

- afwezigheid van zichtbare testknoppen in de productie-app;
- unieke HTML-identificaties en geldige interne schermroutes;
- alle 50 landen en de bijbehorende politie-, ambulance- en brandweernummers;
- Nederlandse spreekzin voor België en Nederland en Engelse noodzin voor de andere landen;
- aanwezigheid van een officiële bron per landprofiel;
- alle 31 niet-lege combinaties van kaart, documenten, gsm, rijbewijs en bagage;
- vijf gebeurtenistypes: verlies, diefstal, overval, fraude en bagage na een vlucht;
- onmiddellijk gevaar aan/uit;
- verder moeten reizen aan/uit;
- correcte enkelvoud/meervoudtekst in elk samengesteld plan;
- het juiste dringende politienummer bij diefstal of overval;
- kritieke inhoud zoals bagagetermijnen, bankappblokkering, consulaire voorwaarden en offlineverwachtingen.

De volledige matrix bevat 31.000 persoonlijke noodplannen:

`50 landen × 5 gebeurtenissen × 31 combinaties × 2 urgentietoestanden × 2 reistoestanden`

## Uitvoering

Start een lokale webserver in de projectmap en open:

`http://127.0.0.1:8765/qa/simulation-runner.html`

De resultaten verschijnen in het scherm en zijn na afloop ook beschikbaar als `window.qaResults`.

## Onderhoud

Wanneer een landprofiel of een procedure wijzigt, moet zowel de productie-app als de onafhankelijke verwachting in `simulation-runner.html` worden aangepast. Hierdoor kan een fout in de app niet ongemerkt als correcte verwachting worden overgenomen.
