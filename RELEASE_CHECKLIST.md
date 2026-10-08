# Release-Checkliste

Für jede neue Version `X.Y.Z`:

1. **Version an allen Stellen gleich setzen**
   - [ ] `VERSION`
   - [ ] `const VERSION` und Kopfkommentar in `eaton-ups-card.js`
   - [ ] Versionszeile in der `README.md` (`<strong>Version X.Y.Z</strong>`)
   - [ ] neuer oberster Eintrag `## X.Y.Z - JJJJ-MM-TT` in `CHANGELOG.md`
2. **Release Notes**
   - [ ] `RELEASE_NOTES_X.Y.Z.md` anlegen (kurz, deutsch, aus dem CHANGELOG-Eintrag)
3. **Prüfen**
   - [ ] `node --check eaton-ups-card.js`
   - [ ] Card in Home Assistant prüfen: Light/Dark Mode, iPhone, iPad, Kiosk, grafischer Editor, Layout-Editor (Mindesthöhe)
4. **Veröffentlichen**
   - [ ] Pull Request nach `main`, Check „Validate“ (HACS) grün, mergen
   - [ ] GitHub → Releases → „Draft a new release“: Tag `vX.Y.Z` („Create new tag on publish“, Target `main`), Titel `vX.Y.Z`, Text aus `RELEASE_NOTES_X.Y.Z.md`
5. **Nachher**
   - [ ] In Home Assistant über HACS aktualisieren und das Frontend vollständig neu laden

## HACS-Logo-Hinweis

Die HACS-Brand-Prüfung und das lokale `brand/icon.png`-Verfahren gelten aktuell für **Integrationen**. Dieses Projekt ist ein **Plugin/Dashboard Custom Card**. Ein Repository-lokales Eaton-Icon kann deshalb derzeit nicht auf die gleiche Weise die HACS-Tabellenansicht steuern wie bei einer Integration wie `lnagel/hass-eaton-ups-mqtt`.

Das Projektlogo und der Screenshot bleiben in der README eingebunden, was für die HACS-Plugin-Prüfung relevant ist.
