# Eaton UPS Card

**Version 1.0.7**

Responsive Home-Assistant-Dashboard-Card für eine **Eaton 3S 850 USV**. Die Card zeigt Status, Ausgangsspannung, Last, Akkulaufzeit und Wirkleistung in einem kompakten 2×2-Layout.

## Funktionen

- Eigenständige Lovelace Custom Card ohne Bubble-Card-Abhängigkeit
- Standardbild direkt in `eaton-ups-card.js` eingebettet
- Das eingebettete PNG wird intern als Blob-URL bereitgestellt und als normales `<img>` geladen
- Kein `/hacsfiles/...`-Bildpfad und keine separate Bilddatei erforderlich
- Alte gespeicherte HACS-Bildpfade werden automatisch erkannt und ignoriert
- Titel links oben, Status direkt darunter
- Vier Messwerte immer in einem stabilen 2×2-Raster
- Kartenhöhe bleibt innerhalb des von Home Assistant zugewiesenen Layout-Bereichs
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

Ab Version **1.0.7** wird das eingebettete PNG nicht mehr direkt als `data:`-URL in das `<img>` geschrieben. Stattdessen erzeugt die Card aus den eingebetteten Bilddaten intern eine Blob-URL und weist diese anschließend dem Bild zu.

Dadurch bleibt das Bild vollständig in `eaton-ups-card.js` enthalten, während die eigentliche Bilddarstellung wie bei einer normalen Bildressource erfolgt.

Zusätzlich erkennt die Card alte Konfigurationswerte wie:

```text
http://homeassistant.local/hacsfiles/eaton-ups-card/assets/eaton_3s_850.png
/hacsfiles/eaton-ups-card/assets/eaton_3s_850.png
assets/eaton_3s_850.png
```

Diese alten Pfade werden automatisch ignoriert und durch das eingebettete Standardbild ersetzt. Es ist deshalb nicht nötig, bestehende Karten manuell zu bereinigen.

Eine eigene Bild-URL kann weiterhin optional verwendet werden:

```yaml
image: /local/images/meine_usv.png
```

Falls eine eigene Bild-URL nicht geladen werden kann, fällt die Card automatisch auf das eingebettete Standardbild zurück.

## Höhe und Layout

Die Card füllt ausschließlich den ihr von Home Assistant zugewiesenen Bereich. Das interne `ha-card` wird mit `inset: 0` exakt an den Host gebunden und kann dadurch nicht über den Layout-Slot hinausragen.

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

Der obere Hero-Bereich belegt ungefähr 46 % der Kartenhöhe, das 2×2-Messwertraster ungefähr 54 %. Beide Bereiche verwenden `min-height: 0` und `overflow: hidden`, damit die eingestellte Höhe eingehalten wird.

`getGridOptions()` liefert standardmäßig 12 Spalten und 6 Zeilen; die Größe kann weiterhin über Home Assistants Tab **Layout** eingestellt werden.

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
