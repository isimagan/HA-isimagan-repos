# Mine repoer

Et privat utviklerpanel for Home Assistant som viser bare repoene dine i HACS.
HACS fortsetter å håndtere installasjon, versjoner og oppdateringer; integrasjonen
legger et enklere, filtrert grensesnitt oppå HACS.

## Funksjoner

- Eget **Mine repoer**-panel i sidepanelet
- Automatisk filtrering på GitHub-eier (standard: `isimagan`)
- Status for installert og tilgjengelig HACS-versjon
- Direkte kontroll mot siste GitHub Release, slik at panelet kan varsle når HACS
  ennå ikke har oppdaget en ny release
- Direkte installasjon av siste GitHub Release gjennom HACS når HACS sitt
  versjonsregister ligger etter
- **Oppdater informasjon** for ett repo eller alle repoer
- Installering og oppdatering gjennom HACS/Home Assistants `update`-entiteter
- Detaljside med README, versjoner og lenker til HACS og GitHub
- Egen statuslinje under hver HACS-boks som viser om tag og GitHub Release er i bruk
- Liste over eierens øvrige offentlige GitHub-repoer med konkret innholdsstatus
  og HACS-relevans; repoer som vises i HACS-boksene utelates
- Kompakt knapp for å laste hele siden på nytt
- Registrering av tilpassede repoer i HACS, med valgfri direkte installasjon
- Generelt varsel og omstartsknapp når Home Assistant Repairs melder at omstart kreves

## Krav

- Home Assistant 2024.4.1 eller nyere
- HACS 2.0 eller nyere
- En administratorbruker (HACS sine WebSocket-kommandoer krever administrator)
- Offentlige GitHub-repoer for den direkte release-kontrollen

## Installering med HACS

1. Åpne HACS.
2. Velg menyen øverst til høyre og **Custom repositories**.
3. Legg til `https://github.com/isimagan/HA-isimagan-repos` som **Integration**.
4. Installer **Mine repoer** og start Home Assistant på nytt.
5. Gå til **Innstillinger → Enheter og tjenester → Legg til integrasjon**.
6. Søk etter **Mine repoer**, kontroller GitHub-eieren og fullfør oppsettet.

Panelet vises deretter i sidepanelet. Bare repoer som HACS allerede kjenner til
vises. Nye repoer dukker derfor opp når de blir lagt til i HACS eller HACS sitt
standardregister.

Du kan også velge **Legg til repo** direkte i panelet. Kopier hele repository-
adressen fra GitHub-adresselinjen, velg **Theme**, **Template**, **Integrasjon**
eller **Dashboard**, og bestem om HACS skal installere repoet med én gang. Av
hensyn til formålet med panelet godtas bare repoer fra den GitHub-eieren som ble
valgt da integrasjonen ble satt opp.

## Hvordan oppdatering virker

**Oppdater informasjon** bruker HACS sin egen `hacs/repository/refresh`-kommando.
Når en installert repository-oppdatering finnes, bruker panelet Home Assistants
vanlige `update.install`-tjeneste. Hvis en update-entitet ikke finnes, faller
panelet tilbake til HACS sin nedlastingskommando.

Panelet spør i tillegg GitHubs offentlige API om siste publiserte release. Når
GitHub har en annen versjon enn HACS sitt register, vises knappen **Installer
GitHub v…**. Den sender den eksplisitte GitHub-taggen til HACS sin egen
nedlastingskommando, slik at HACS fortsatt står for installasjonen selv om det
sentrale versjonsregisteret ligger etter. GitHub-svaret mellomlagres i
nettleseren i ti minutter for å begrense API-kall.

Oversikten over andre repoer lagres også i nettleseren. En full sideoppdatering
gjenbruker derfor siste vellykkede svar i stedet for å bruke GitHubs anonyme
API-kvote på nytt. Hvis GitHub svarer med en ratebegrensning, beholdes sist
kjente data; standardoppsettet for `isimagan` har i tillegg en lokal
reserveoversikt for de fire øvrige repoene.

Panelet leser også Home Assistants generelle Repairs-register. Når en aktiv,
ikke ignorert reparasjon bruker den etablerte `restart_required`-markeringen,
vises et varsel med lenke til Reparasjoner og en knapp for å starte Home
Assistant på nytt. Omstart krever alltid en ekstra bekreftelse.

## Utvikling

Integrasjonen har ingen byggetrinn eller tredjeparts frontend-avhengigheter.
JavaScript-filen leveres direkte av Home Assistant fra
`custom_components/mine_repoer/frontend/`.

## Lisens

[MIT](LICENSE)
