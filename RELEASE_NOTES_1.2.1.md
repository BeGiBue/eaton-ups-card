# Eaton UPS Card 1.2.1

Fehlerbehebung für das Sections-Dashboard.

## Behoben

- Die Card ragte über ihren Bereich hinaus, wenn im Layout-Editor zu wenige Zeilen eingestellt waren; nachfolgende Karten rutschten hinein. Die Card meldet jetzt ihre benötigte Mindesthöhe (`min_rows`), kleinere Werte lässt der Editor nicht mehr zu.
- Titel beginnt oben auf gleicher Höhe wie bei der NAS Card.

## Update

Über HACS aktualisieren und anschließend Home Assistant bzw. den Browser vollständig neu laden. Eine zuvor zu klein eingestellte Höhe wird automatisch auf die Mindesthöhe angehoben.
