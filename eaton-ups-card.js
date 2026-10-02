// Eaton UPS Card v1.0.4
const VERSION="1.0.4";
const DEFAULT_IMAGE="https://raw.githubusercontent.com/BeGiBue/eaton-ups-card/main/images/eaton_3s_850.png";
const DEF={
  name:"Eaton 3S 850",
  status_entity:"sensor.ups_status",
  status_data_entity:"sensor.ups_statusdaten",
  voltage_entity:"sensor.ups_ausgangsspannung",
  load_entity:"sensor.ups_last",
  runtime_entity:"sensor.ups_akkulaufzeit",
  power_entity:"sensor.waschkeller_ups_wirkleistung",
  show_status_data:true,
  image:""
};
const METRICS=[
  ["voltage_entity","Ausgangsspannung","mdi:sine-wave","warning"],
  ["load_entity","Last","mdi:gauge","primary"],
  ["runtime_entity","Akkulaufzeit","mdi:battery-clock-outline","success"],
  ["power_entity","Wirkleistung","mdi:flash","primary"]
];

class EatonUpsCard extends HTMLElement{
  constructor(){super();this.attachShadow({mode:"open"});this._config={...DEF};}
  static getStubConfig(){return{...DEF};}
  static getConfigForm(){
    const e=name=>({name,selector:{entity:{}}});
    const t=name=>({name,selector:{text:{}}});
    const L={name:"Titel",status_entity:"Status",status_data_entity:"Statusdaten",voltage_entity:"Ausgangsspannung",load_entity:"Last",runtime_entity:"Akkulaufzeit",power_entity:"Wirkleistung",show_status_data:"Statusdetails anzeigen",image:"Eigenes Gerätebild (URL, optional)"};
    return{
      schema:[t("name"),e("status_entity"),e("status_data_entity"),e("voltage_entity"),e("load_entity"),e("runtime_entity"),e("power_entity"),{name:"show_status_data",selector:{boolean:{}}},t("image")],
      computeLabel:s=>L[s.name],
      computeHelper:s=>s.name==="image"?"Leer = Standardbild aus dem Repository.":undefined
    };
  }
  setConfig(c){this._config={...DEF,...c};this.render();}
  set hass(h){this._hass=h;this.render();}
  get hass(){return this._hass;}
  getCardSize(){return 6;}
  getGridOptions(){return{columns:12,rows:6,min_columns:4,min_rows:4};}
  _s(id){return id&&this._hass?.states?.[id];}
  _f(id){const s=this._s(id);if(!s)return"—";try{if(this._hass?.formatEntityState)return this._hass.formatEntityState(s);}catch(_){}const u=s.attributes?.unit_of_measurement;return`${s.state}${u?` ${u}`:""}`;}
  _e(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
  _more(id){if(id)this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:true,composed:true,detail:{entityId:id}}));}
  _status(){
    const status=String(this._s(this._config.status_entity)?.state??"");
    const data=String(this._s(this._config.status_data_entity)?.state??"");
    const v=`${status} ${data}`.trim().toUpperCase();
    if(/FAULT|FSD/.test(v))return{label:"Störung",detail:"Fehler erkannt",tone:"error",icon:"mdi:alert-circle-outline"};
    if(/OVER/.test(v))return{label:"Überlast",detail:"Last prüfen",tone:"error",icon:"mdi:alert-outline"};
    if(/\bLB\b|LOW/.test(v))return{label:"Akku niedrig",detail:"Akkustand kritisch",tone:"warning",icon:"mdi:battery-alert-variant-outline"};
    if(/BYPASS/.test(v))return{label:"Bypass",detail:"Bypass aktiv",tone:"warning",icon:"mdi:swap-horizontal"};
    if(/\bOB\b|ON BATTERY/.test(v))return{label:"Batteriebetrieb",detail:"Versorgung über Akku",tone:"warning",icon:"mdi:battery-medium"};
    if(/\bOFF\b/.test(v))return{label:"Ausgeschaltet",detail:"USV ist aus",tone:"neutral",icon:"mdi:power"};
    if(/CHRG|CHARG/.test(v))return{label:"Netzbetrieb",detail:"Akku wird geladen",tone:"success",icon:"mdi:battery-charging"};
    if(/\bOL\b|ONLINE/.test(v))return{label:"Online",detail:"Alles in Ordnung",tone:"success",icon:"mdi:check-circle-outline"};
    return{label:status||"Status unbekannt",detail:data||"Keine Statusdaten",tone:"neutral",icon:"mdi:information-outline"};
  }
  _metric([key,label,icon,tone]){
    const id=this._config[key];
    return `<button class="metric tone-${tone}" data-more="${this._e(id)}"><ha-icon icon="${icon}"></ha-icon><span><small>${label}</small><b>${this._e(this._f(id))}</b></span></button>`;
  }
  render(){
    if(!this.shadowRoot)return;
    const c=this._config,s=this._status(),img=String(c.image??"").trim()||DEFAULT_IMAGE;
    this.shadowRoot.innerHTML=`<style>${EatonUpsCard.css}</style><ha-card>
      <img class="pic" alt="Eaton 3S 850">
      <div class="veil"></div>
      <section class="hero">
        <div class="heading"><h1>${this._e(c.name)}</h1><div class="statusline tone-${s.tone}"><ha-icon icon="${s.icon}"></ha-icon><span><b>${this._e(s.label)}</b>${c.show_status_data?`<small>${this._e(s.detail)}</small>`:""}</span></div></div>
        <div class="badge tone-${s.tone}"><ha-icon icon="mdi:power-plug-battery-outline"></ha-icon><span>USV</span></div>
      </section>
      <section class="metrics">${METRICS.map(m=>this._metric(m)).join("")}</section>
    </ha-card>`;
    const p=this.shadowRoot.querySelector(".pic");
    if(p){p.onerror=()=>{if(p.dataset.fallback!=="1"){p.dataset.fallback="1";p.src=DEFAULT_IMAGE;}else p.style.display="none";};p.src=img;}
    this.shadowRoot.querySelectorAll("[data-more]").forEach(x=>x.onclick=()=>this._more(x.dataset.more));
  }
  static get css(){return`
    :host{display:block;position:relative;width:100%;height:100%;min-height:0;overflow:hidden;container-type:inline-size;
      --bg:var(--ha-card-background,var(--card-background-color,#fff));
      --txt:var(--primary-text-color,#111);
      --mut:var(--secondary-text-color,#777);
      --pri:var(--primary-color,#03a9f4);
      --ok:var(--success-color,#4caf50);
      --warn:var(--warning-color,#ff9800);
      --err:var(--error-color,#f44336);
      --bord:color-mix(in srgb,var(--divider-color,#888) 65%,transparent);
      --pan:color-mix(in srgb,var(--bg) 92%,var(--pri) 8%)}
    *{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}
    ha-card{position:absolute;inset:0;overflow:hidden;display:grid;grid-template-rows:42% 58%;color:var(--txt);
      background:radial-gradient(circle at 90% 0,color-mix(in srgb,var(--pri) 14%,transparent),transparent 34%),var(--bg);
      border:1px solid var(--bord);border-radius:var(--ha-card-border-radius,18px)}
    .tone-primary{color:var(--pri)}.tone-success{color:var(--ok)}.tone-warning{color:var(--warn)}.tone-error{color:var(--err)}.tone-neutral{color:var(--mut)}
    .pic{position:absolute;z-index:0;top:10px;right:10px;width:87%;height:70%;object-fit:contain;object-position:right top;pointer-events:none;filter:drop-shadow(0 10px 14px #0005)}
    .veil{position:absolute;z-index:1;inset:0;background:
      linear-gradient(90deg,var(--bg) 0 36%,color-mix(in srgb,var(--bg) 55%,transparent) 62%,transparent 90%),
      linear-gradient(180deg,transparent 0 52%,color-mix(in srgb,var(--bg) 18%,transparent) 72%,var(--bg) 100%);pointer-events:none}
    .hero,.metrics{position:relative;z-index:2}
    .hero{padding:clamp(12px,1.8cqw,20px);overflow:hidden}
    .heading{position:relative;z-index:2;max-width:58%}
    h1{margin:0;font-size:clamp(24px,3.2cqw,34px);line-height:1.05;color:var(--txt)}
    .statusline{display:flex;align-items:center;gap:8px;margin-top:10px}.statusline ha-icon{--mdc-icon-size:22px}
    .statusline span{display:flex;flex-direction:column;min-width:0}.statusline b{color:var(--txt);font-size:15px}.statusline small{color:var(--mut);font-size:12px;margin-top:2px}
    .badge{position:absolute;top:clamp(12px,1.8cqw,20px);right:clamp(12px,1.8cqw,20px);min-width:58px;min-height:34px;padding:6px 10px;
      display:flex;align-items:center;justify-content:center;gap:5px;border:1px solid currentColor;border-radius:999px;background:color-mix(in srgb,var(--bg) 82%,transparent);
      backdrop-filter:blur(8px);font-size:12px;font-weight:700}.badge ha-icon{--mdc-icon-size:18px}
    .metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:clamp(8px,1.2cqw,14px);padding:clamp(9px,1.5cqw,16px);overflow:hidden}
    .metric{position:relative;min-width:0;min-height:0;display:grid;place-items:center;padding:clamp(10px,1.4cqw,16px);border:1px solid var(--bord);border-radius:11px;
      background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(8px);text-align:center}
    .metric:before{content:"";position:absolute;inset:0;border-radius:inherit;border:1px solid color-mix(in srgb,currentColor 62%,transparent);pointer-events:none}
    .metric>ha-icon{position:absolute;left:clamp(12px,1.8cqw,18px);top:50%;transform:translateY(-50%);--mdc-icon-size:clamp(24px,3.1cqw,32px)}
    .metric span{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-width:0;max-width:calc(100% - 56px)}
    .metric small{color:var(--mut);font-size:clamp(11px,1.45cqw,13px);line-height:1.15}
    .metric b{color:var(--txt);margin-top:4px;font-size:clamp(18.9px,2.52cqw,25.2px);line-height:1.05;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
    @container(max-width:560px){.pic{width:96%;height:72%}.heading{max-width:66%}.badge{min-width:52px;padding:5px 8px}.metric>ha-icon{left:10px;--mdc-icon-size:23px}.metric span{max-width:calc(100% - 44px)}.metric b{font-size:clamp(17.85px,4.4cqw,22.05px)}}
  `;}
}
if(!customElements.get("eaton-ups-card"))customElements.define("eaton-ups-card",EatonUpsCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==="eaton-ups-card"))window.customCards.push({type:"eaton-ups-card",name:"Eaton UPS Card",description:"Theme-sensitive Eaton UPS dashboard card with native Home Assistant entity selectors.",preview:true,documentationURL:"https://github.com/BeGiBue/eaton-ups-card"});
console.info(`Eaton UPS Card v${VERSION}`);
