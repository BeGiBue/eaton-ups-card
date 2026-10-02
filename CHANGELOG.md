# Changelog

Alle relevanten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## 1.0.3 - 2026-10-02

### Geändert

- Der Standard-Bildpfad wird jetzt direkt aus der aktuellen Home-Assistant-Adresse aufgebaut und verweist auf `.../hacsfiles/eaton-ups-card/assets/eaton_3s_850.png`.
- Dadurch wird exakt derselbe Pfad verwendet, unter dem HACS die Bilddatei ausliefert.
- Die theme-sensitive Darstellung bleibt aktiv und verwendet weiterhin die Home-Assistant-Theme-Variablen für Kartenhintergrund, Text, Flächen, Rahmen und Badge.
- Die Bilddatei selbst wird nicht von dieser Änderung ersetzt; sie kann separat unter `assets/eaton_3s_850.png` hochgeladen werden.

## 1.0.2 - 2026-10-02

### Geändert

- Kartenhintergrund, Textfarben, Flächen, Rahmen und Badge folgen jetzt den aktiven Home-Assistant-Theme-Variablen.
- Der Standard-Bildpfad verwendet jetzt direkt den HACS-Pfad `/hacsfiles/eaton-ups-card/assets/eaton_3s_850.png`.

### Behoben

- Bildanzeige über HACS-Pfad korrigiert.

## 1.0.1 - 2026-10-02

### Geändert

- Entity-Felder im grafischen Karteneditor verwenden jetzt den nativen Home-Assistant-Entity-Picker.
- Eine eigene Bild-URL ist optional; ohne eigene Angabe wird automatisch das integrierte Bild verwendet.
- Die Statusauswertung berücksichtigt zusätzlich `sensor.ups_statusdaten` und erkennt unter anderem `ONLINE`, `ON BATTERY`, `LOW`, `CHRG` und `CHARG`.
- Doppelte Einheiten in Messwerten werden vermieden, wenn der Sensorzustand die Einheit bereits enthält.

### Behoben

- Editor-Konfiguration und Standardwerte vereinheitlicht.

## 1.0.0 - 2026-10-02

### Hinzugefügt

- Erste öffentliche Version der Eaton UPS Card
- Responsive Custom Card für Home Assistant
- Standard-Unterstützung für Eaton 3S 850
- Anzeige von Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung
- Automatische Interpretation typischer NUT-Statuswerte
- Grafischer Karteneditor
- Sections-/Layout-Unterstützung über `getGridOptions()`
- Integriertes Eaton-3S-850-Bild
- HACS-Unterstützung
