// Eaton UPS Card v1.0.1
const VERSION = "1.0.1";

const DEFAULT_IMAGE = new URL("./assets/eaton_3s_850.png", import.meta.url).href;

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

  return {
    label: raw || "Unbekannt",
    detail: "Status unbekannt",
    color: "#9aa7b3",
    badge: "USV",
    icon: "mdi:power-plug",
  };
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

  getCardSize() {
    return 4;
  }

  getGridOptions() {
    return {
      columns: 12,
      rows: 4,
      min_columns: 4,
      min_rows: 3,
    };
  }

  static getConfigElement() {
    return document.createElement("eaton-ups-card-editor");
  }

  static getStubConfig() {
    return { ...DEFAULT_CONFIG };
  }

  _state(entityId) {
    if (!entityId || !this._hass) return null;
    return this._hass.states?.[entityId] ?? null;
  }

  _formatted(entityId) {
    const entity = this._state(entityId);
    if (!entity) return "–";

    const unit = entity.attributes?.unit_of_measurement;
    const state = entity.state ?? "–";

    if (!unit || String(state).toLowerCase().includes(String(unit).toLowerCase())) {
      return String(state);
    }
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
    const statusDataEntity = this._state(this._config.status_data_entity);
    const statusData = statusDataEntity?.state;
    const statusSource = [statusEntity?.state, statusData].filter(Boolean).join(" ");
    const status = statusInfo(statusSource);
    const image = this._config.image?.trim() || DEFAULT_IMAGE;

    const metricHtml = METRICS.map((metric) => {
      const entityId = this._config[metric.key];
      return `
        <button class="metric" data-entity="${esc(entityId)}" style="--accent:${metric.accent}">
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
        }

        * { box-sizing:border-box; }

        ha-card {
          position:relative;
          width:100%;
          height:100%;
          min-height:270px;
          overflow:hidden;
          border-radius:var(--ha-card-border-radius, 28px);
          border:1px solid rgba(255,255,255,.07);
          color:#fff;
          background:
            radial-gradient(circle at 78% 18%, rgba(48,140,152,.22), transparent 34%),
            linear-gradient(135deg, #17384c 0%, #102d40 48%, #103844 100%);
          box-shadow:var(--ha-card-box-shadow, 0 10px 28px rgba(0,0,0,.24));
        }

        .layout {
          display:grid;
          grid-template-columns:minmax(210px,1fr) minmax(200px,.95fr) minmax(390px,1.5fr);
          gap:22px;
          align-items:center;
          width:100%;
          height:100%;
          min-height:270px;
          padding:18px;
        }

        .image-wrap {
          display:flex;
          align-items:center;
          justify-content:center;
          min-width:0;
          height:100%;
          min-height:230px;
          border-radius:24px;
          background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.025));
          border:1px solid rgba(255,255,255,.07);
          overflow:hidden;
        }

        .image-wrap img {
          display:block;
          width:94%;
          height:94%;
          object-fit:contain;
          filter:drop-shadow(0 18px 20px rgba(0,0,0,.26));
        }

        .info { min-width:0; }

        .name {
          margin:0 0 18px;
          font-size:clamp(26px,3.3cqw,42px);
          line-height:1.02;
          font-weight:800;
          letter-spacing:-.7px;
        }

        .status-row {
          display:flex;
          align-items:center;
          gap:12px;
          margin-bottom:10px;
        }

        .dot {
          width:16px;
          height:16px;
          flex:0 0 16px;
          border-radius:50%;
          background:${status.color};
          box-shadow:0 0 18px color-mix(in srgb, ${status.color} 65%, transparent);
        }

        .status {
          color:${status.color};
          font-size:clamp(18px,2.1cqw,26px);
          line-height:1.05;
          font-weight:750;
        }

        .detail {
          color:rgba(226,238,248,.72);
          font-size:clamp(14px,1.4cqw,18px);
          line-height:1.35;
        }

        .status-data {
          margin-top:12px;
          color:rgba(226,238,248,.52);
          font-size:12px;
          line-height:1.3;
          overflow-wrap:anywhere;
        }

        .metrics {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:14px;
          min-width:0;
        }

        .metric {
          appearance:none;
          display:grid;
          grid-template-columns:58px minmax(0,1fr);
          align-items:center;
          min-width:0;
          min-height:112px;
          padding:16px 18px;
          border:1px solid color-mix(in srgb, var(--accent) 24%, rgba(255,255,255,.08));
          border-radius:22px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012)),
            rgba(20,45,64,.56);
          color:#fff;
          font:inherit;
          text-align:left;
          cursor:pointer;
          transition:transform .12s ease, background .12s ease;
        }

        .metric:hover { background:rgba(28,58,77,.76); }
        .metric:active { transform:scale(.985); }

        .metric ha-icon {
          width:42px;
          height:42px;
          color:var(--accent);
        }

        .metric-copy { min-width:0; }

        .metric-label {
          margin-bottom:7px;
          color:rgba(224,236,248,.82);
          font-size:clamp(13px,1.35cqw,17px);
          line-height:1.05;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .metric-value {
          color:#fff;
          font-size:clamp(25px,3cqw,38px);
          line-height:1;
          font-weight:800;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .badge {
          position:absolute;
          top:18px;
          right:18px;
          display:flex;
          align-items:center;
          gap:8px;
          padding:10px 16px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(118,147,194,.16);
          color:#e9f0fb;
          font-size:15px;
          font-weight:700;
          backdrop-filter:blur(8px);
          z-index:2;
        }

        .badge ha-icon {
          width:20px;
          height:20px;
          color:${status.color};
        }

        @container (max-width:920px) {
          ha-card { min-height:330px; }

          .layout {
            grid-template-columns:160px minmax(0,1fr);
            grid-template-areas:
              "image info"
              "metrics metrics";
            min-height:330px;
            gap:14px 18px;
          }

          .image-wrap {
            grid-area:image;
            min-height:130px;
            height:130px;
          }

          .info { grid-area:info; }
          .metrics { grid-area:metrics; }
          .badge { display:none; }
          .name { margin-bottom:12px; }
        }

        @container (max-width:560px) {
          ha-card { min-height:470px; }

          .layout {
            grid-template-columns:112px minmax(0,1fr);
            padding:14px;
          }

          .image-wrap {
            min-height:104px;
            height:104px;
            border-radius:18px;
          }

          .metrics { gap:10px; }

          .metric {
            grid-template-columns:40px minmax(0,1fr);
            min-height:92px;
            padding:12px;
            border-radius:18px;
          }

          .metric ha-icon {
            width:30px;
            height:30px;
          }

          .metric-label { font-size:11px; }
          .metric-value { font-size:21px; }
          .name { font-size:21px; }
          .status { font-size:16px; }
          .detail { font-size:13px; }
          .status-data { display:none; }
        }
      </style>

      <ha-card>
        <div class="badge"><ha-icon icon="${status.icon}"></ha-icon>${esc(status.badge)}</div>
        <div class="layout">
          <div class="image-wrap">
            <img src="${esc(image)}" alt="${esc(this._config.name)}">
          </div>

          <div class="info">
            <div class="name">${esc(this._config.name)}</div>
            <div class="status-row">
              <span class="dot"></span>
              <span class="status">${esc(status.label)}</span>
            </div>
            <div class="detail">${esc(status.detail)}</div>
            ${this._config.show_status_data && statusData ? `<div class="status-data">${esc(statusData)}</div>` : ""}
          </div>

          <div class="metrics">${metricHtml}</div>
        </div>
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

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._render();
  }

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
        :host {
          display:block;
          color:var(--primary-text-color);
        }

        .editor {
          display:grid;
          gap:18px;
          padding:8px 0;
        }

        .section {
          display:grid;
          gap:14px;
        }

        .title {
          font-size:14px;
          font-weight:700;
        }

        .grid {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:14px 16px;
        }

        .field {
          display:grid;
          gap:6px;
          min-width:0;
        }

        .label {
          color:var(--secondary-text-color);
          font-size:12px;
        }

        input[type="text"] {
          width:100%;
          min-height:44px;
          padding:9px 12px;
          border:1px solid var(--divider-color);
          border-radius:8px;
          background:var(--card-background-color);
          color:var(--primary-text-color);
          font:inherit;
        }

        ha-entity-picker {
          width:100%;
          min-width:0;
        }

        .check {
          display:flex;
          align-items:center;
          gap:10px;
          color:var(--primary-text-color);
          font-size:14px;
        }

        .check input {
          width:20px;
          height:20px;
        }

        .hint {
          color:var(--secondary-text-color);
          font-size:12px;
          line-height:1.4;
        }

        @media(max-width:520px) {
          .grid { grid-template-columns:1fr; }
        }
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
              <input data-key="image" type="text" value="${esc(this._config.image ?? "")}" placeholder="Standardbild aus dem Repository">
            </label>
          </div>

          <label class="check">
            <input data-key="show_status_data" type="checkbox" ${this._config.show_status_data !== false ? "checked" : ""}>
            Statusdaten anzeigen
          </label>

          <div class="hint">
            Die Entitäten werden mit dem normalen Home-Assistant-Entity-Picker ausgewählt.
            Ohne eigene Bild-URL verwendet die Card automatisch das mitgelieferte Bild
            <code>assets/eaton_3s_850.png</code>.
          </div>
        </div>
      </div>`;

    this.shadowRoot.querySelectorAll("ha-entity-picker").forEach((picker) => {
      const key = picker.dataset.key;
      picker.hass = this._hass;
      picker.value = this._config[key] ?? "";
      picker.allowCustomEntity = true;
      picker.addEventListener("value-changed", (event) => {
        const value = event.detail?.value ?? "";
        this._emit({ ...this._config, [key]: value });
      });
    });

    this.shadowRoot.querySelectorAll('input[type="text"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        const key = event.currentTarget.dataset.key;
        let value = event.currentTarget.value;

        const next = { ...this._config };
        if (key === "image" && !value.trim()) {
          delete next.image;
        } else {
          next[key] = value;
        }
        this._emit(next);
      });
    });

    const checkbox = this.shadowRoot.querySelector('input[data-key="show_status_data"]');
    checkbox?.addEventListener("change", (event) => {
      this._emit({ ...this._config, show_status_data: event.currentTarget.checked });
    });
  }
}

if (!customElements.get("eaton-ups-card-editor")) {
  customElements.define("eaton-ups-card-editor", EatonUpsCardEditor);
}

if (!customElements.get("eaton-ups-card")) {
  customElements.define("eaton-ups-card", EatonUpsCard);
}

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
