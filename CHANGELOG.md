# Changelog

Alle relevanten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## 1.0.5 - 2026-10-02

### Geändert

- Das 1×4-Messwertlayout wurde entfernt, da es sich auf breiteren Karten überlappen konnte.
- Die vier Messwerte werden jetzt unabhängig von der Kartenbreite immer in einem stabilen 2×2-Raster dargestellt.
- Das Eaton-3S-850-Bild ist jetzt direkt als Data-URI in `eaton-ups-card.js` eingebettet.
- Für das Standardbild wird keine separate Datei unter `/hacsfiles/...` mehr benötigt.
- Eine eigene Bild-URL kann weiterhin optional über `image:` gesetzt werden.
- Der Hero-Bereich mit Titel links oben, Status und Hintergrundbild bleibt erhalten.
- Theme-sensitive Farben und Home-Assistant-Theme-Variablen bleiben vollständig erhalten.

### Behoben

- Überlappungen im bisherigen 1×4-Layout beseitigt.
- Fehler durch fehlende oder nicht von HACS ausgelieferte Bilddateien beseitigt.

## 1.0.4 - 2026-10-02

### Geändert

- Das USV-Bild liegt jetzt als Hintergrund in der oberen Kartenhälfte.
- Der Kartentitel sitzt links oben und bleibt frei lesbar über dem Hintergrundbild.
- Status und Beschreibung liegen ebenfalls im oberen Hero-Bereich.
- Die Messwerte wurden in eine überlagernde obere Reihe verschoben und beginnen bereits über dem unteren Rand des Hero-Bereichs.
- Auf breiten Karten werden alle vier Messwerte in einer Reihe dargestellt; bei schmaleren Karten wechseln sie automatisch auf ein 2×2-Layout.
- Theme-sensitive Farben und Home-Assistant-Theme-Variablen bleiben vollständig erhalten.

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
- Integriertes freigestelltes Eaton-3S-850-Bild
- HACS-Unterstützung
