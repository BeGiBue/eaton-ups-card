# Eaton UPS Card

**Version 1.0.0**

Responsive Home-Assistant-Dashboard-Card für eine **Eaton 3S 850 USV**. Die Card zeigt Status, Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung in einem kompakten, responsiven Layout.

Die Card enthält das freigestellte Eaton-3S-850-Bild direkt im Repository und verwendet es standardmäßig automatisch.

## Screenshots

Screenshots können im Ordner `screenshots/` abgelegt werden.

## Funktionen

- Eigenständige Lovelace Custom Card ohne Bubble-Card-Abhängigkeit
- Integriertes Eaton-3S-850-Bild
- Große 2×2-Messwertanzeigen
- Responsive Darstellung für breite und schmale Dashboards
- Breite und Höhe über Home Assistants **Layout**-Funktion
- Sections-Layout mit Full-Width-Unterstützung
- Grafischer Karteneditor in Home Assistant
- Automatische Statusauswertung typischer NUT-Werte wie `OL`, `OB`, `LB`, `BYPASS`, `OVER` und `FAULT`
- Farbige Statusanzeige für Netzbetrieb, Batteriebetrieb und Störungen
- Klick auf einen Messwert öffnet den jeweiligen Home-Assistant-Entity-Dialog
- Keine externen JavaScript-Bibliotheken

## Standard-Entitäten

Die Card ist standardmäßig auf folgende Entitäten vorkonfiguriert:

```text
sensor.ups_ausgangsspannung
sensor.ups_last
sensor.ups_status
sensor.ups_statusdaten
sensor.ups_akkulaufzeit
sensor.waschkeller_ups_wirkleistung
```

Alle Entitäten können im grafischen Karteneditor oder per YAML geändert werden.

## Installation über HACS

### Automatisch

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BeGiBue&repository=eaton-ups-card&category=plugin)

### Manuell

1. In HACS **Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/BeGiBue/eaton-ups-card` hinzufügen und Typ **Dashboard** auswählen.
3. **Eaton UPS Card** installieren.
4. Home-Assistant-App bzw. Browser vollständig neu laden.

## Card hinzufügen

Die Card erscheint als **Eaton UPS Card** im Karten-Picker.

Minimal-Konfiguration:

```yaml
type: custom:eaton-ups-card
```

Vollständiges Beispiel:

```yaml
type: custom:eaton-ups-card
name: Eaton 3S 850
status_entity: sensor.ups_status
status_data_entity: sensor.ups_statusdaten
voltage_entity: sensor.ups_ausgangsspannung
load_entity: sensor.ups_last
runtime_entity: sensor.ups_akkulaufzeit
power_entity: sensor.waschkeller_ups_wirkleistung
show_status_data: true
```

## Integriertes Bild

Das mitgelieferte Bild liegt unter:

```text
assets/eaton_3s_850.png
```

Die Card ermittelt den Installationspfad über `import.meta.url`, sodass das Bild sowohl bei einer HACS-Installation als auch bei einer manuellen Installation automatisch gefunden wird.

Optional kann über `image:` eine eigene Bild-URL angegeben werden:

```yaml
image: /local/images/meine_usv.png
```

## Layout

Breite und Höhe werden nicht in der Card festgelegt. Sie werden über Home Assistants Tab **Layout** eingestellt. Die Card implementiert `getGridOptions()` und füllt den zugewiesenen Bereich vollständig aus.

Bei breiten Karten wird die Darstellung in drei Bereiche aufgeteilt:

```text
USV-Bild | Name / Status | 2×2 Messwerte
```

Bei schmaleren Karten ordnet sich das Layout automatisch neu an.

## Statusauswertung

Typische NUT-Statuswerte werden automatisch interpretiert:

- `OL` → Netzbetrieb / Alles in Ordnung
- `OL CHRG` → Netzbetrieb / Akku wird geladen
- `OB` → Batteriebetrieb
- `LB` → Akku niedrig
- `BYPASS` → Bypass
- `OVER` → Überlast
- `FAULT` / `FSD` → Störung
- `OFF` → Ausgeschaltet

## Hinweise

Dieses Projekt ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Eaton oder Home Assistant.

Eaton und Eaton 3S sind Marken ihrer jeweiligen Rechteinhaber.

## Lizenz

Creative Commons Attribution-NonCommercial 4.0 International (**CC BY-NC 4.0**). Änderungen und nicht-kommerzielle Weitergabe sind unter Namensnennung erlaubt; kommerzielle Nutzung ist nicht gestattet. Details stehen in `LICENSE`.
