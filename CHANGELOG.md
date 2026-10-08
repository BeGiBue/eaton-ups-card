# Changelog

Alle relevanten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## 1.2.2 - 2026-10-08

### Dokumentation

- Release Notes 1.0.0: Lizenzangabe auf AGPL-3.0 korrigiert (stand dort noch CC BY-NC 4.0).
- Release-Checkliste auf den aktuellen Ablauf gebracht (vorher Stand 1.0.0).
- README verweist im Abschnitt „Release“ auf alle Versionen statt nur auf 1.0.0.
- `.gitignore` ergänzt.

## 1.2.1 - 2026-10-06

### Behoben

- Die Card ragte über ihren Bereich hinaus, wenn im Layout-Editor zu wenige Zeilen eingestellt waren; nachfolgende Karten rutschten hinein. Die Card meldet jetzt ihre benötigte Mindesthöhe (`min_rows`), kleinere Werte lässt der Editor nicht mehr zu.
- Innenabstand oben in px statt em, damit der Titel auf gleicher Höhe beginnt wie bei der NAS Card.

## 1.2.0 - 2026-10-06

### Geändert

- Glas-Look: Hintergrund, Rand und Blur kommen vom Theme (z. B. Frosted Glass). Status als Pill, Messwerte linksbündig mit Icon-Chip, großer Zahl und kleiner Einheit.
- Last mit Fortschrittsbalken (orange ab 70 %, rot ab 90 %).
- Optimiert für Hochformat (iPhone, iPad, Raspberry-Pi-Kiosk): alle Größen in em, die Schrift wächst mit der Kartenbreite; ab ca. 700 px stehen die vier Messwerte in einer Reihe, darunter in 2×2; die Höhe ergibt sich aus dem Inhalt.
- Touch: größere Tippflächen, kein Hover-Zwang, keine Textauswahl, kein filter: blur.
- Neue Option image_mode: Gerätebild groß im Hintergrund (Standard) oder neben dem Titel (inline). Das Bild ist jetzt in der Datei eingebettet.
- Neue Option scale (0,8 – 1,8) für Kiosk-Displays.
- Die Card zeichnet nur bei geänderten Werten neu; nicht verfügbare Werte erscheinen als „—“.

### Entfernt

- USV-Badge oben rechts.

## 1.0.4 - 2026-10-03

### Geändert

- Messwerte in den vier Feldern mittig ausgerichtet.
- Messwert-Schrift um etwa 5 % vergrößert.
- Farbschema an die NAS Card angeglichen.
- Theme-Variablen für Primär-, Erfolgs-, Warn- und Fehlerfarben übernommen.
- Kartenhintergrund und Panel-Farben an die NAS Card angeglichen.

## 1.0.0 - 2026-10-02

### Hinzugefügt

- Erste stabile Veröffentlichung der Eaton UPS Card für Home Assistant.
- Responsive Lovelace Custom Card für eine Eaton 3S 850 USV.
- Anzeige von Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung.
- Automatische Interpretation typischer NUT-Statuswerte.
- Native Home-Assistant-Entity-Picker im grafischen Karteneditor.
- Theme-sensitive Darstellung für Light Mode, Dark Mode und benutzerdefinierte Themes.
- Eingebettetes Produktbild ohne zusätzliche HACS-Asset-Abhängigkeit.
- Festes 2×2-Messwertlayout.
- Home-Assistant-Layout-Unterstützung über `getGridOptions()`.
- Klickbare Messwerte mit Home-Assistant-Mehr-Informationen-Dialog.
- README mit Screenshot, HACS-Installationsbutton und Projektlogo.
- Release Notes für Version 1.0.0.

### Lizenz

- Projekt unter GNU Affero General Public License v3.0 (AGPL-3.0).
