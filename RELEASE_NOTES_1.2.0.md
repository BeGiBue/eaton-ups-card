# Eaton UPS Card 1.2.0

Neuer Glas-Look und Optimierung für Hochformat, Touch und Kiosk-Displays.

## Highlights

- Glas-Look: Hintergrund, Rand und Blur kommen vom Theme (z. B. Frosted Glass); Status als Pill, Messwerte mit Icon-Chip, großer Zahl und kleiner Einheit
- Last mit Fortschrittsbalken (orange ab 70 %, rot ab 90 %)
- Optimiert für iPhone, iPad und Raspberry-Pi-Kiosk: Schrift wächst mit der Kartenbreite, ab ca. 700 px vier Messwerte in einer Reihe, Höhe ergibt sich aus dem Inhalt
- Touch: größere Tippflächen, kein Hover-Zwang, keine Textauswahl, kein `filter: blur`
- Neue Option `image_mode`: Gerätebild groß im Hintergrund (Standard) oder neben dem Titel (`inline`); das Bild ist in der Datei eingebettet
- Neue Option `scale` (0,8 – 1,8) für Kiosk-Displays
- Neuzeichnen nur bei geänderten Werten; nicht verfügbare Werte erscheinen als „—“

## Entfernt

- USV-Badge oben rechts

## Update

Über HACS aktualisieren und anschließend Home Assistant bzw. den Browser vollständig neu laden.
