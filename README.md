# Eaton UPS Card

**Version 1.0.6**

Responsive Home-Assistant-Dashboard-Card für eine **Eaton 3S 850 USV**. Die Card zeigt Status, Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung in einem kompakten 2×2-Layout.

## Funktionen

- Eigenständige Lovelace Custom Card ohne Bubble-Card-Abhängigkeit
- Standardbild direkt in `eaton-ups-card.js` eingebettet
- PNG wird als echtes `<img>`-Element im oberen Hero-Bereich dargestellt
- Kein `/hacsfiles/...`-Bildpfad und keine separate Bilddatei erforderlich
- Titel links oben, Status direkt darunter
- Vier Messwerte immer in einem stabilen 2×2-Raster
- Kartenhöhe folgt exakt dem in Home Assistant eingestellten Layout-Bereich
- Kein internes `min-height`, das die eingestellte Kartenhöhe überschreibt
- Grafischer Karteneditor in Home Assistant
- Native Home-Assistant-Entity-Picker für alle Entitäten
- Theme-sensitiver Hintergrund, Text, Flächen, Rahmen und Badge
- Automatische Statusauswertung typischer NUT-Werte
- Klick auf einen Messwert öffnet den jeweiligen Home-Assistant-Entity-Dialog
- Keine externen JavaScript-Bibliotheken

## Standard-Entitäten

```text
sensor.ups_ausgangsspannung
sensor.ups_last
sensor.ups_status
sensor.ups_statusdaten
sensor.ups_akkulaufzeit
sensor.waschkeller_ups_wirkleistung
```

Alle Entitäten können im grafischen Karteneditor über den normalen Home-Assistant-Entity-Picker oder per YAML geändert werden.

## Installation über HACS

### Automatisch

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BeGiBue&repository=eaton-ups-card&category=plugin)

### Manuell

1. In HACS **Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/BeGiBue/eaton-ups-card` hinzufügen und Typ **Dashboard** auswählen.
3. **Eaton UPS Card** installieren.
4. Home Assistant bzw. den Browser vollständig neu laden.

## Card hinzufügen

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

Ab Version **1.0.6** ist das Standardbild als PNG-Data-URI direkt in `eaton-ups-card.js` eingebettet und wird als normales HTML-`<img>` gerendert.

Das ist absichtlich nicht als CSS-`background-image` umgesetzt. Dadurch ist die Darstellung in Safari, Chrome, Firefox und WebViews robuster.

Eine eigene Bild-URL kann weiterhin optional verwendet werden:

```yaml
image: /local/images/meine_usv.png
```

Falls diese URL nicht geladen werden kann, fällt die Card automatisch auf das eingebettete Standardbild zurück.

## Höhe und Layout

Die Card verwendet **keine feste Pixelhöhe** und auch kein `min-height`, das Home Assistant überstimmt. Stattdessen füllt sie exakt den vom Dashboard zugewiesenen Bereich:

```text
┌──────────────────────────────────────┐
│ Eaton 3S 850              [ USV ]    │
│ ● Online                    BILD     │
│ Alles in Ordnung                     │
├──────────────────────────────────────┤
│ Ausgangsspannung   │ Last            │
│ Akkulaufzeit       │ Wirkleistung    │
└──────────────────────────────────────┘
```

Der obere Bereich belegt ungefähr 46 % der Kartenhöhe, das 2×2-Messwertraster ungefähr 54 %. Dadurch ragt die Card nicht mehr über die im Home-Assistant-Tab **Layout** eingestellte Höhe hinaus.

`getGridOptions()` liefert standardmäßig 12 Spalten und 6 Zeilen; die Höhe kann weiterhin über Home Assistants Layout-Einstellungen verändert werden.

## Theme-Unterstützung

Die Card folgt dem aktiven Home-Assistant-Theme und verwendet unter anderem:

```text
--ha-card-background
--card-background-color
--primary-text-color
--secondary-text-color
--secondary-background-color
--divider-color
--ha-card-border-color
--ha-card-box-shadow
--ha-card-border-radius
```

Die vier Messwert-Akzentfarben bleiben bewusst erhalten.

## Statusauswertung

Typische NUT-Statuswerte werden automatisch interpretiert:

- `OL` / `ONLINE` → Online / Alles in Ordnung
- `OL CHRG` / `CHARG` → Netzbetrieb / Akku wird geladen
- `OB` / `ON BATTERY` → Batteriebetrieb
- `LB` / `LOW` → Akku niedrig
- `BYPASS` → Bypass
- `OVER` → Überlast
- `FAULT` / `FSD` → Störung
- `OFF` → Ausgeschaltet

Für die Auswertung werden `status_entity` und `status_data_entity` gemeinsam berücksichtigt.

## Hinweise

Dieses Projekt ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Eaton oder Home Assistant.

Eaton und Eaton 3S sind Marken ihrer jeweiligen Rechteinhaber.

## Lizenz

Creative Commons Attribution-NonCommercial 4.0 International (**CC BY-NC 4.0**). Änderungen und nicht-kommerzielle Weitergabe sind unter Namensnennung erlaubt; kommerzielle Nutzung ist nicht gestattet. Details stehen in `LICENSE`.
