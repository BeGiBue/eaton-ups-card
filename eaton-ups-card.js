// Eaton UPS Card v1.0.5
const VERSION = "1.0.5";
const EMBEDDED_IMAGE = "data:image/jpeg;base64,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";

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

  getCardSize() { return 5; }
  getGridOptions() { return { columns: 12, rows: 5, min_columns: 4, min_rows: 4 }; }
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
    const image = this._config.image?.trim() || EMBEDDED_IMAGE;

    const metricHtml = METRICS.map((metric) => {
      const entityId = this._config[metric.key];
      return `<button class="metric" data-entity="${esc(entityId)}" style="--accent:${metric.accent}">
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
          --ups-card-bg:var(--ha-card-background,var(--card-background-color,#ffffff));
          --ups-card-fg:var(--primary-text-color,#111111);
          --ups-card-secondary:var(--secondary-text-color,#666666);
          --ups-card-surface:var(--secondary-background-color,var(--card-background-color,#ffffff));
          --ups-card-border:var(--ha-card-border-color,var(--divider-color,rgba(127,127,127,.2)));
        }
        * { box-sizing:border-box; }
        ha-card {
          position:relative;
          width:100%;
          height:100%;
          min-height:420px;
          overflow:hidden;
          border-radius:var(--ha-card-border-radius,28px);
          border:var(--ha-card-border-width,1px) solid var(--ups-card-border);
          color:var(--ups-card-fg);
          background:var(--ups-card-bg);
          box-shadow:var(--ha-card-box-shadow,0 4px 14px rgba(0,0,0,.12));
        }
        .hero {
          position:relative;
          min-height:240px;
          padding:18px;
          overflow:hidden;
          background:
            linear-gradient(90deg,
              color-mix(in srgb,var(--ups-card-bg) 98%,transparent) 0%,
              color-mix(in srgb,var(--ups-card-bg) 91%,transparent) 34%,
              color-mix(in srgb,var(--ups-card-bg) 62%,transparent) 63%,
              color-mix(in srgb,var(--ups-card-bg) 18%,transparent) 100%),
            linear-gradient(180deg,transparent 54%,var(--ups-card-bg) 100%),
            url("${esc(image)}") right center/min(58%,620px) auto no-repeat,
            linear-gradient(135deg,color-mix(in srgb,var(--ups-card-bg) 94%,var(--primary-color,#03a9f4) 6%),var(--ups-card-bg));
        }
        .title-row { position:relative; z-index:2; display:flex; align-items:flex-start; justify-content:space-between; gap:16px; }
        .name {
          margin:0;
          max-width:70%;
          color:var(--ups-card-fg);
          font-size:clamp(28px,3.8cqw,46px);
          line-height:1;
          font-weight:800;
          letter-spacing:-.8px;
          text-shadow:0 1px 12px color-mix(in srgb,var(--ups-card-bg) 75%,transparent);
        }
        .badge {
          display:flex;
          align-items:center;
          gap:8px;
          padding:9px 14px;
          border-radius:18px;
          border:1px solid var(--ups-card-border);
          background:color-mix(in srgb,var(--ups-card-surface) 82%,transparent);
          color:var(--ups-card-fg);
          font-size:14px;
          font-weight:700;
          backdrop-filter:blur(8px);
          flex:0 0 auto;
        }
        .badge ha-icon { width:20px; height:20px; color:${status.color}; }
        .status-block { position:relative; z-index:2; margin-top:14px; max-width:52%; }
        .status-row { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .dot {
          width:14px;
          height:14px;
          flex:0 0 14px;
          border-radius:50%;
          background:${status.color};
          box-shadow:0 0 16px color-mix(in srgb,${status.color} 65%,transparent);
        }
        .status { color:${status.color}; font-size:clamp(18px,2.1cqw,26px); line-height:1.05; font-weight:750; }
        .detail { color:var(--ups-card-secondary); font-size:clamp(14px,1.4cqw,18px); line-height:1.35; }
        .status-data { margin-top:8px; color:color-mix(in srgb,var(--ups-card-secondary) 80%,transparent); font-size:12px; line-height:1.3; overflow-wrap:anywhere; }
        .metrics {
          position:relative;
          z-index:3;
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:12px;
          padding:0 18px 18px;
          margin-top:-34px;
        }
        .metric {
          appearance:none;
          display:grid;
          grid-template-columns:52px minmax(0,1fr);
          align-items:center;
          min-width:0;
          min-height:108px;
          padding:14px 18px;
          border:1px solid color-mix(in srgb,var(--accent) 30%,var(--ups-card-border));
          border-radius:20px;
          background:color-mix(in srgb,var(--ups-card-surface) 90%,transparent);
          color:var(--ups-card-fg);
          font:inherit;
          text-align:left;
          cursor:pointer;
          backdrop-filter:blur(10px);
          box-shadow:0 10px 24px rgba(0,0,0,.08);
          transition:transform .12s ease,background .12s ease;
        }
        .metric:hover { background:color-mix(in srgb,var(--ups-card-surface) 78%,var(--primary-color,#03a9f4) 22%); }
        .metric:active { transform:scale(.985); }
        .metric ha-icon { width:36px; height:36px; color:var(--accent); }
        .metric-copy { min-width:0; }
        .metric-label {
          margin-bottom:7px;
          color:var(--ups-card-secondary);
          font-size:clamp(12px,1.2cqw,15px);
          line-height:1.05;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .metric-value {
          color:var(--ups-card-fg);
          font-size:clamp(24px,2.6cqw,34px);
          line-height:1;
          font-weight:800;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        @container (max-width:700px) {
          ha-card { min-height:440px; }
          .hero {
            min-height:245px;
            padding:14px;
            background:
              linear-gradient(90deg,
                color-mix(in srgb,var(--ups-card-bg) 98%,transparent) 0%,
                color-mix(in srgb,var(--ups-card-bg) 88%,transparent) 42%,
                color-mix(in srgb,var(--ups-card-bg) 46%,transparent) 100%),
              linear-gradient(180deg,transparent 48%,var(--ups-card-bg) 100%),
              url("${esc(image)}") right bottom/64% auto no-repeat,
              var(--ups-card-bg);
          }
          .name { max-width:72%; font-size:24px; }
          .badge { padding:7px 10px; font-size:12px; }
          .status-block { max-width:72%; }
          .status { font-size:16px; }
          .detail { font-size:13px; }
          .status-data { display:none; }
          .metrics { gap:9px; padding:0 12px 12px; margin-top:-20px; }
          .metric { grid-template-columns:38px minmax(0,1fr); min-height:88px; padding:11px; border-radius:16px; }
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
            <div class="status-row"><span class="dot"></span><span class="status">${esc(status.label)}</span></div>
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
      detail: { config: next },
      bubbles: true,
      composed: true,
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
      <div class="editor"><div class="section">
        <div class="title">Eaton UPS Card</div>
        <div class="grid">
          <label class="field"><span class="label">Name</span><input data-key="name" type="text" value="${esc(this._config.name)}"></label>
          ${ENTITY_FIELDS.map(([key,label]) => `<div class="field"><span class="label">${label}</span><ha-entity-picker data-key="${key}"></ha-entity-picker></div>`).join("")}
          <label class="field"><span class="label">Eigene Bild-URL (optional)</span><input data-key="image" type="text" value="${esc(this._config.image ?? "")}" placeholder="Standardbild ist direkt eingebettet"></label>
        </div>
        <label class="check"><input data-key="show_status_data" type="checkbox" ${this._config.show_status_data !== false ? "checked" : ""}>Statusdaten anzeigen</label>
        <div class="hint">Das Standardbild ist direkt in <code>eaton-ups-card.js</code> eingebettet. Es wird keine zusätzliche Bilddatei benötigt. Die vier Messwerte bleiben immer im 2×2-Raster.</div>
      </div></div>`;

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
