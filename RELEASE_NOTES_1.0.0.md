# Eaton UPS Card 1.0.0

Erste stabile Veröffentlichung der Eaton UPS Card für Home Assistant.

## Highlights

- Theme-sensitive Dashboard-Card für die Eaton 3S 850
- Status, Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung auf einen Blick
- stabiles 2×2-Messwertlayout
- eingebettetes Produktbild – keine zusätzliche Bilddatei bei der HACS-Installation erforderlich
- native Home-Assistant-Entity-Picker im Karteneditor
- automatische Auswertung typischer NUT-Statuswerte
- Unterstützung des Home-Assistant-Sections-/Grid-Layouts
- Klick auf einen Messwert öffnet den zugehörigen Entity-Dialog

## Installation

Die empfohlene Installation erfolgt über HACS als Dashboard-Repository.

Nach der Installation Home Assistant bzw. den Browser vollständig neu laden.

## Minimalkonfiguration

```yaml
type: custom:eaton-ups-card
```

## Lizenz

CC BY-NC 4.0 – nicht-kommerzielle Nutzung, Änderung und Weitergabe unter Namensnennung.
