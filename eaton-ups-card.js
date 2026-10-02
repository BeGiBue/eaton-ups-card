// Eaton UPS Card v1.0.4
const VERSION = "1.0.4";

const DEFAULT_IMAGE = `${window.location.origin}/hacsfiles/eaton-ups-card/assets/eaton_3s_850.png`;

const DEFAULT_CONFIG = {
  name: "Eaton 3S 850",
  status_entity: "sensor.ups_status",
  status_data_entity: "sensor.ups_statusdaten",
  voltage_entity: "sensor.ups_ausgangsspannung",
  load_entity: "sensor.ups_last",
  runtime_entity: "sensor.ups_akkulaufzeit",
  power_entity: "sensor.waschkeller_ups_wirkleistung",
  show_status_data: true,
};

const ENTITY_FIELDS = [
  ["status_entity", "Status"],
  ["status_data_entity", "Statusdaten"],
  ["voltage_entity", "Ausgangsspannung"],
  ["load_entity", "Last"],
  ["runtime_entity", "Akkulaufzeit"],
  ["power_entity", "Wirkleistung"],
];

const METRICS = [
  { key: "voltage_entity", label: "Ausgangsspannung", icon: "mdi:sine-wave", accent: "#f4c84c" },
  { key: "load_entity", label: "Last", icon: "mdi:gauge", accent: "#47a5ff" },
  { key: "runtime_entity", label: "Akkulaufzeit", icon: "mdi:battery-clock-outline", accent: "#59ea80" },
  { key: "power_entity", label: "Wirkleistung", icon: "mdi:flash", accent: "#b46cff" },
];

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function statusInfo(raw) {
  const s = String(raw ?? "").trim().toUpperCase();
  const has = (token) => s.split(/\s+/).includes(token) || s.includes(token);

  if (has("FAULT") || has("FSD")) return { label: "Störung", detail: "USV prüfen", color: "#ff5c68", badge: "Störung", icon: "mdi:alert" };
  if (has("LB") || has("LOW")) return { label: "Akku niedrig", detail: "Akkukapazität kritisch", color: "#ff5c68", badge: "Akku niedrig", icon: "mdi:battery-alert" };
  if (has("OB") || has("ON BATTERY")) return { label: "Batteriebetrieb", detail: "Netzversorgung unterbrochen", color: "#ffb74d", badge: "Batterie", icon: "mdi:battery" };
  if (has("BYPASS")) return { label: "Bypass", detail: "Last wird am Wechselrichter vorbeigeführt", color: "#ffb74d", badge: "Bypass", icon: "mdi:transit-connection-variant" };
  if (has("OVER")) return { label: "Überlast", detail: "USV-Last reduzieren", color: "#ff5c68", badge: "Überlast", icon: "mdi:gauge-full" };
  if (has("OFF")) return { label: "Ausgeschaltet", detail: "USV-Ausgang ist aus", color: "#9aa7b3", badge: "Offline", icon: "mdi:power" };
  if (has("OL") || has("ONLINE")) {
    if (has("CHRG") || has("CHARG")) return { label: "Netzbetrieb", detail: "Akku wird geladen", color: "#67ef8a", badge: "USV", icon: "mdi:power-plug" };
    return { label: "Online", detail: "Alles in Ordnung", color: "#67ef8a", badge: "USV", icon: "mdi:power-plug" };
  }

  return { label: raw || "Unbekannt", detail: "Status unbekannt", color: "#9aa7b3", badge: "USV", icon: "mdi:power-plug" };
}

class EatonUpsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = { ...DEFAULT_CONFIG };
    this._hass = null;
  }

  setConfig(config) {
    if (!config) throw new Error("Konfiguration fehlt");
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() { return 4; }

  getGridOptions() {
    return { columns: 12, rows: 4, min_columns: 4, min_rows: 3 };
  }

  static getConfigElement() { return document.createElement("eaton-ups-card-editor"); }
  static getStubConfig() { return { ...DEFAULT_CONFIG }; }

  _state(entityId) {
    if (!entityId || !this._hass) return null;
    return this._hass.states?.[entityId] ?? null;
  }

  _formatted(entityId) {
    const entity = this._state(entityId);
    if (!entity) return "–";
    const unit = entity.attributes?.unit_of_measurement;
    const state = entity.state ?? "–";
    if (!unit || String(state).toLowerCase().includes(String(unit).toLowerCase())) return String(state);
    return `${state} ${unit}`;
  }

  _fireMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  _render() {
    if (!this.shadowRoot) return;

    const statusEntity = this._state(this._config.status_entity);
    const statusData = this._state(this._config.status_data_entity)?.state;
    const statusSource = [statusEntity?.state, statusData].filter(Boolean).join(" ");
    const status = statusInfo(statusSource);
    const image = this._config.image?.trim() || DEFAULT_IMAGE;

    const metricHtml = METRICS.map((metric, index) => {
      const entityId = this._config[metric.key];
      return `
        <button class="metric metric-${index + 1}" data-entity="${esc(entityId)}" style="--accent:${metric.accent}">
          <ha-icon icon="${metric.icon}"></ha-icon>
          <div class="metric-copy">
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${esc(this._formatted(entityId))}</div>
          </div>
        </button>`;
    }).join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display:block;
          width:100%;
          height:100%;
          min-width:0;
          container-type:inline-size;
          --ups-card-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
          --ups-card-fg: var(--primary-text-color, #111111);
          --ups-card-secondary: var(--secondary-text-color, #666666);
          --ups-card-surface: var(--secondary-background-color, var(--card-background-color, #ffffff));
          --ups-card-border: var(--ha-card-border-color, var(--divider-color, rgba(127,127,127,.2)));
        }

        * { box-sizing:border-box; }

        ha-card {
          position:relative;
          width:100%;
          height:100%;
          min-height:320px;
          overflow:hidden;
          border-radius:var(--ha-card-border-radius, 28px);
          border:var(--ha-card-border-width, 1px) solid var(--ups-card-border);
          color:var(--ups-card-fg);
          background:var(--ups-card-bg);
          box-shadow:var(--ha-card-box-shadow, 0 4px 14px rgba(0,0,0,.12));
        }

        .hero {
          position:relative;
          min-height:178px;
          padding:18px;
          overflow:hidden;
          background:
            linear-gradient(90deg,
              color-mix(in srgb, var(--ups-card-bg) 94%, transparent) 0%,
              color-mix(in srgb, var(--ups-card-bg) 84%, transparent) 34%,
              color-mix(in srgb, var(--ups-card-bg) 52%, transparent) 62%,
              color-mix(in srgb, var(--ups-card-bg) 26%, transparent) 100%),
            linear-gradient(180deg,
              transparent 58%,
              var(--ups-card-bg) 100%),
            url("${esc(image)}") right center / min(48%, 560px) auto no-repeat,
            linear-gradient(135deg,
              color-mix(in srgb, var(--ups-card-bg) 94%, var(--primary-color, #03a9f4) 6%),
              var(--ups-card-bg));
        }

        .title-row {
          position:relative;
          z-index:2;
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:16px;
        }

        .name {
          margin:0;
          max-width:70%;
          color:var(--ups-card-fg);
          font-size:clamp(28px,3.8cqw,46px);
          line-height:1;
          font-weight:800;
          letter-spacing:-.8px;
          text-shadow:0 1px 12px color-mix(in srgb, var(--ups-card-bg) 75%, transparent);
        }

        .badge {
          display:flex;
          align-items:center;
          gap:8px;
          padding:9px 14px;
          border-radius:18px;
          border:1px solid var(--ups-card-border);
          background:color-mix(in srgb, var(--ups-card-surface) 82%, transparent);
          color:var(--ups-card-fg);
          font-size:14px;
          font-weight:700;
          backdrop-filter:blur(8px);
          flex:0 0 auto;
        }

        .badge ha-icon { width:20px; height:20px; color:${status.color}; }

        .status-block {
          position:relative;
          z-index:2;
          margin-top:14px;
          max-width:52%;
        }

        .status-row {
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:6px;
        }

        .dot {
          width:14px;
          height:14px;
          flex:0 0 14px;
          border-radius:50%;
          background:${status.color};
          box-shadow:0 0 16px color-mix(in srgb, ${status.color} 65%, transparent);
        }

        .status {
          color:${status.color};
          font-size:clamp(18px,2.1cqw,26px);
          line-height:1.05;
          font-weight:750;
        }

        .detail {
          color:var(--ups-card-secondary);
          font-size:clamp(14px,1.4cqw,18px);
          line-height:1.35;
        }

        .status-data {
          margin-top:8px;
          color:color-mix(in srgb, var(--ups-card-secondary) 80%, transparent);
          font-size:12px;
          line-height:1.3;
          overflow-wrap:anywhere;
        }

        .metrics {
          position:relative;
          z-index:3;
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:12px;
          padding:0 18px 18px;
          margin-top:-28px;
        }

        .metric {
          appearance:none;
          display:grid;
          grid-template-columns:46px minmax(0,1fr);
          align-items:center;
          min-width:0;
          min-height:104px;
          padding:14px 16px;
          border:1px solid color-mix(in srgb, var(--accent) 30%, var(--ups-card-border));
          border-radius:20px;
          background:color-mix(in srgb, var(--ups-card-surface) 88%, transparent);
          color:var(--ups-card-fg);
          font:inherit;
          text-align:left;
          cursor:pointer;
          backdrop-filter:blur(10px);
          box-shadow:0 10px 24px rgba(0,0,0,.08);
          transition:transform .12s ease, background .12s ease;
        }

        .metric:hover {
          background:color-mix(in srgb, var(--ups-card-surface) 76%, var(--primary-color, #03a9f4) 24%);
        }

        .metric:active { transform:scale(.985); }
        .metric ha-icon { width:34px; height:34px; color:var(--accent); }
        .metric-copy { min-width:0; }

        .metric-label {
          margin-bottom:7px;
          color:var(--ups-card-secondary);
          font-size:clamp(12px,1.15cqw,15px);
          line-height:1.05;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .metric-value {
          color:var(--ups-card-fg);
          font-size:clamp(23px,2.6cqw,34px);
          line-height:1;
          font-weight:800;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        @container (max-width:900px) {
          .hero {
            min-height:190px;
            background:
              linear-gradient(90deg,
                color-mix(in srgb, var(--ups-card-bg) 95%, transparent) 0%,
                color-mix(in srgb, var(--ups-card-bg) 78%, transparent) 56%,
                color-mix(in srgb, var(--ups-card-bg) 36%, transparent) 100%),
              linear-gradient(180deg, transparent 58%, var(--ups-card-bg) 100%),
              url("${esc(image)}") right center / min(56%, 430px) auto no-repeat,
              var(--ups-card-bg);
          }
          .metrics { grid-template-columns:repeat(2,minmax(0,1fr)); margin-top:-18px; }
          .status-block { max-width:58%; }
        }

        @container (max-width:560px) {
          ha-card { min-height:0; }
          .hero {
            min-height:200px;
            padding:14px;
            background:
              linear-gradient(90deg,
                color-mix(in srgb, var(--ups-card-bg) 96%, transparent) 0%,
                color-mix(in srgb, var(--ups-card-bg) 76%, transparent) 62%,
                color-mix(in srgb, var(--ups-card-bg) 44%, transparent) 100%),
              linear-gradient(180deg, transparent 50%, var(--ups-card-bg) 100%),
              url("${esc(image)}") right bottom / 62% auto no-repeat,
              var(--ups-card-bg);
          }
          .name { max-width:72%; font-size:24px; }
          .badge { padding:7px 10px; font-size:12px; }
          .status-block { max-width:70%; }
          .status { font-size:16px; }
          .detail { font-size:13px; }
          .status-data { display:none; }
          .metrics { grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; padding:0 12px 12px; margin-top:-10px; }
          .metric { grid-template-columns:36px minmax(0,1fr); min-height:86px; padding:11px; border-radius:16px; }
          .metric ha-icon { width:28px; height:28px; }
          .metric-label { font-size:11px; }
          .metric-value { font-size:20px; }
        }
      </style>

      <ha-card>
        <div class="hero">
          <div class="title-row">
            <div class="name">${esc(this._config.name)}</div>
            <div class="badge"><ha-icon icon="${status.icon}"></ha-icon>${esc(status.badge)}</div>
          </div>

          <div class="status-block">
            <div class="status-row">
              <span class="dot"></span>
              <span class="status">${esc(status.label)}</span>
            </div>
            <div class="detail">${esc(status.detail)}</div>
            ${this._config.show_status_data && statusData ? `<div class="status-data">${esc(statusData)}</div>` : ""}
          </div>
        </div>

        <div class="metrics">${metricHtml}</div>
      </ha-card>`;

    this.shadowRoot.querySelectorAll(".metric").forEach((el) => {
      el.addEventListener("click", () => this._fireMoreInfo(el.dataset.entity));
    });
  }
}

class EatonUpsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = { ...DEFAULT_CONFIG };
    this._hass = null;
  }

  set hass(hass) { this._hass = hass; this._render(); }
  setConfig(config) { this._config = { ...DEFAULT_CONFIG, ...config }; this._render(); }

  _emit(next) {
    this._config = next;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: next }, bubbles: true, composed: true,
    }));
  }

  _render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; color:var(--primary-text-color); }
        .editor { display:grid; gap:18px; padding:8px 0; }
        .section { display:grid; gap:14px; }
        .title { font-size:14px; font-weight:700; }
        .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px 16px; }
        .field { display:grid; gap:6px; min-width:0; }
        .label { color:var(--secondary-text-color); font-size:12px; }
        input[type="text"] { width:100%; min-height:44px; padding:9px 12px; border:1px solid var(--divider-color); border-radius:8px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; }
        ha-entity-picker { width:100%; min-width:0; }
        .check { display:flex; align-items:center; gap:10px; color:var(--primary-text-color); font-size:14px; }
        .check input { width:20px; height:20px; }
        .hint { color:var(--secondary-text-color); font-size:12px; line-height:1.4; }
        @media(max-width:520px) { .grid { grid-template-columns:1fr; } }
      </style>

      <div class="editor">
        <div class="section">
          <div class="title">Eaton UPS Card</div>
          <div class="grid">
            <label class="field">
              <span class="label">Name</span>
              <input data-key="name" type="text" value="${esc(this._config.name)}">
            </label>

            ${ENTITY_FIELDS.map(([key, label]) => `
              <div class="field">
                <span class="label">${label}</span>
                <ha-entity-picker data-key="${key}"></ha-entity-picker>
              </div>
            `).join("")}

            <label class="field">
              <span class="label">Eigene Bild-URL (optional)</span>
              <input data-key="image" type="text" value="${esc(this._config.image ?? "")}" placeholder="Standardbild aus HACS">
            </label>
          </div>

          <label class="check">
            <input data-key="show_status_data" type="checkbox" ${this._config.show_status_data !== false ? "checked" : ""}>
            Statusdaten anzeigen
          </label>

          <div class="hint">
            Das Bild wird als Hintergrund der oberen Kartenhälfte verwendet. Ohne eigene Bild-URL nutzt die Card automatisch
            <code>/hacsfiles/eaton-ups-card/assets/eaton_3s_850.png</code>.
          </div>
        </div>
      </div>`;

    this.shadowRoot.querySelectorAll("ha-entity-picker").forEach((picker) => {
      const key = picker.dataset.key;
      picker.hass = this._hass;
      picker.value = this._config[key] ?? "";
      picker.allowCustomEntity = true;
      picker.addEventListener("value-changed", (event) => {
        this._emit({ ...this._config, [key]: event.detail?.value ?? "" });
      });
    });

    this.shadowRoot.querySelectorAll('input[type="text"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        const key = event.currentTarget.dataset.key;
        const value = event.currentTarget.value;
        const next = { ...this._config };
        if (key === "image" && !value.trim()) delete next.image;
        else next[key] = value;
        this._emit(next);
      });
    });

    this.shadowRoot.querySelector('input[data-key="show_status_data"]')?.addEventListener("change", (event) => {
      this._emit({ ...this._config, show_status_data: event.currentTarget.checked });
    });
  }
}

if (!customElements.get("eaton-ups-card-editor")) customElements.define("eaton-ups-card-editor", EatonUpsCardEditor);
if (!customElements.get("eaton-ups-card")) customElements.define("eaton-ups-card", EatonUpsCard);

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "eaton-ups-card")) {
  window.customCards.push({
    type: "eaton-ups-card",
    name: "Eaton UPS Card",
    description: "Responsive Home-Assistant-Dashboard-Card für eine Eaton 3S 850 USV.",
    preview: false,
  });
}

console.info(
  `%c EATON-UPS-CARD %c v${VERSION} `,
  "color:white;background:#0f3341;font-weight:700;padding:2px 5px;border-radius:3px 0 0 3px",
  "color:#0f3341;background:#67ef8a;font-weight:700;padding:2px 5px;border-radius:0 3px 3px 0"
);
