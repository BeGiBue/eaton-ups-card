# Eaton UPS Card 1.0.0 – Release Checklist

- [x] `eaton-ups-card.js` auf Version 1.0.0 gesetzt
- [x] `VERSION` auf 1.0.0 gesetzt
- [x] `CHANGELOG.md` auf den ersten stabilen Release konsolidiert
- [x] `RELEASE_NOTES_1.0.0.md` aktualisiert
- [x] README mit Screenshot und HACS-Installationsbutton aktualisiert
- [x] Projektlogo ins Repository aufgenommen
- [x] `hacs.json` enthält `name`, `filename` und `render_readme`
- [x] HACS Action als `.github/workflows/validate.yml` hinzugefügt (`category: plugin`)
- [x] GitHub Issues sind aktiviert
- [x] Trademark-Hinweis beibehalten
- [x] CC BY-NC 4.0 Lizenz beibehalten
- [x] JavaScript syntaktisch geprüft
- [ ] GitHub Repository-Beschreibung setzen
- [ ] GitHub Topics setzen, z. B. `home-assistant`, `hacs`, `lovelace`, `custom-card`, `eaton`, `ups`
- [ ] Vollständigen GitHub Release `1.0.0` erstellen (nicht nur einen Tag)
- [ ] Nach erfolgreicher HACS Action das Repository unter `plugin` bei `hacs/default` einreichen

## HACS-Logo-Hinweis

Die HACS-Brand-Prüfung und das lokale `brand/icon.png`-Verfahren gelten aktuell für **Integrationen**. Dieses Projekt ist ein **Plugin/Dashboard Custom Card**. Ein Repository-lokales Eaton-Icon kann deshalb derzeit nicht auf die gleiche Weise die HACS-Tabellenansicht steuern wie bei einer Integration wie `lnagel/hass-eaton-ups-mqtt`.

Das Projektlogo und der Screenshot bleiben in der README eingebunden, was für die HACS-Plugin-Prüfung relevant ist.
