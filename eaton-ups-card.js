// Eaton UPS Card v1.2.2 – Hochformat / Touch / Kiosk
const VERSION="1.2.2";
const DEFAULT_IMAGE="data:image/png;base64,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";
const DEF={
  name:"Eaton 3S 850",
  status_entity:"sensor.ups_status",
  status_data_entity:"sensor.ups_statusdaten",
  voltage_entity:"sensor.ups_ausgangsspannung",
  load_entity:"sensor.ups_last",
  runtime_entity:"sensor.ups_akkulaufzeit",
  power_entity:"sensor.waschkeller_ups_wirkleistung",
  show_status_data:true,
  scale:1,
  image_mode:"background",
  image:""
};
// [Konfig-Schlüssel, Label, Icon, Rolle]
const METRICS=[
  ["voltage_entity","Ausgangs&shy;spannung","mdi:sine-wave","voltage"],
  ["load_entity","Last","mdi:gauge","load"],
  ["runtime_entity","Akkulaufzeit","mdi:battery-clock-outline","runtime"],
  ["power_entity","Wirkleistung","mdi:flash","power"]
];

class EatonUpsCard extends HTMLElement{
  constructor(){super();this.attachShadow({mode:"open"});this._config={...DEF};this._sig="";}
  static getStubConfig(){return{...DEF};}
  static getConfigForm(){
    const e=name=>({name,selector:{entity:{}}});
    const t=name=>({name,selector:{text:{}}});
    const L={name:"Titel",status_entity:"Status",status_data_entity:"Statusdaten",voltage_entity:"Ausgangsspannung",load_entity:"Last",runtime_entity:"Akkulaufzeit",power_entity:"Wirkleistung",show_status_data:"Statusdetails anzeigen",scale:"Größe (Kiosk: 1,2 – 1,5)",image_mode:"Gerätebild",image:"Eigenes Gerätebild (URL, optional)"};
    return{
      schema:[t("name"),e("status_entity"),e("status_data_entity"),e("voltage_entity"),e("load_entity"),e("runtime_entity"),e("power_entity"),{name:"show_status_data",selector:{boolean:{}}},{name:"scale",selector:{number:{min:.8,max:1.8,step:.05,mode:"slider"}}},{name:"image_mode",selector:{select:{mode:"dropdown",options:[{value:"background",label:"Groß im Hintergrund"},{value:"inline",label:"Neben dem Titel"}]}}},t("image")],
      computeLabel:s=>L[s.name],
      computeHelper:s=>s.name==="image"?"Leer = integriertes Standardbild.":undefined
    };
  }
  setConfig(c){this._config={...DEF,...c};this._sig="";this._built=false;this._update();}
  set hass(h){this._hass=h;this._update();}
  get hass(){return this._hass;}
  getCardSize(){return 6;}
  // Höhe ergibt sich aus dem Inhalt; min_rows verhindert, dass im Layout-Editor weniger Zeilen
  // eingestellt werden als der Inhalt braucht (sonst ragt die Card in die nächste hinein).
  getGridOptions(){
    const sc=Math.min(1.8,Math.max(.8,Number(this._config.scale)||1));
    return{columns:12,min_columns:4,min_rows:this._minRows||Math.ceil((400*sc+8)/64)};
  }
  connectedCallback(){if(!this._ro)this._ro=new ResizeObserver(()=>this._measure());this._ro.observe(this);}
  disconnectedCallback(){this._ro?.disconnect();}
  // Natürliche Inhaltshöhe in Grid-Zeilen umrechnen (HA: 56 px Zeile + 8 px Abstand)
  _measure(){
    const card=this.shadowRoot?.querySelector("ha-card"),last=card?.querySelector(".tiles");
    if(!last||!this.clientWidth)return;
    const cs=getComputedStyle(card),hs=getComputedStyle(this);
    const h=last.offsetTop+last.offsetHeight+parseFloat(cs.paddingBottom)+parseFloat(cs.borderTopWidth)+parseFloat(cs.borderBottomWidth);
    const rh=parseFloat(hs.getPropertyValue("--row-height"))||56,gap=parseFloat(hs.getPropertyValue("--row-gap"))||8;
    this._minRows=Math.max(1,Math.ceil((h+gap)/(rh+gap)));
  }

  _s(id){return id&&this._hass?.states?.[id];}
  _e(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
  _more(id){if(id)this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:true,composed:true,detail:{entityId:id}}));}

  _val(id){
    const s=this._s(id);
    if(!s||["unavailable","unknown",""].includes(s.state))return{value:"—",unit:"",num:NaN};
    let txt=`${s.state}`;
    try{if(this._hass?.formatEntityState)txt=this._hass.formatEntityState(s);}catch(_){}
    const m=String(txt).match(/^(-?[\d.,\s]+?)\s*([^\d\s.,].*)?$/);
    const num=parseFloat(String(s.state).replace(",","."));
    if(m)return{value:m[1].trim(),unit:(m[2]||s.attributes?.unit_of_measurement||"").trim(),num};
    return{value:txt,unit:"",num};
  }

  _status(){
    const status=String(this._s(this._config.status_entity)?.state??"");
    const data=String(this._s(this._config.status_data_entity)?.state??"");
    const v=`${status} ${data}`.trim().toUpperCase();
    if(/FAULT|FSD/.test(v))return{label:"Störung",detail:"Fehler erkannt",tone:"error"};
    if(/OVER/.test(v))return{label:"Überlast",detail:"Last prüfen",tone:"error"};
    if(/\bLB\b|LOW/.test(v))return{label:"Akku niedrig",detail:"Akkustand kritisch",tone:"warning"};
    if(/BYPASS/.test(v))return{label:"Bypass",detail:"Bypass aktiv",tone:"warning"};
    if(/\bOB\b|ON BATTERY/.test(v))return{label:"Batteriebetrieb",detail:"Versorgung über Akku",tone:"warning"};
    if(/\bOFF\b/.test(v))return{label:"Ausgeschaltet",detail:"USV ist aus",tone:"neutral"};
    if(/CHRG|CHARG/.test(v))return{label:"Netzbetrieb",detail:"Akku wird geladen",tone:"success"};
    if(/\bOL\b|ONLINE/.test(v))return{label:"Online",detail:"Alles in Ordnung",tone:"success"};
    return{label:status||"Status unbekannt",detail:data||"Keine Statusdaten",tone:"neutral"};
  }
  _loadTone(n){if(isNaN(n))return"neutral";if(n>=90)return"error";if(n>=70)return"warning";return"success";}

  _update(){
    if(!this.shadowRoot||!this._config)return;
    const c=this._config;
    const ids=[c.status_entity,c.status_data_entity,...METRICS.map(m=>c[m[0]])];
    const sig=JSON.stringify(c)+ids.map(id=>{const s=this._s(id);return s?`${s.state}|${s.attributes?.unit_of_measurement||""}`:"-";}).join("§")+(this._hass?.language||"");
    if(sig===this._sig&&this._built)return;
    this._sig=sig;
    this._render();
  }

  _render(){
    const c=this._config,st=this._status();
    const img=String(c.image??"").trim()||DEFAULT_IMAGE;
    const sc=Math.min(1.8,Math.max(.8,Number(c.scale)||1)),bgm=c.image_mode!=="inline";
    const tiles=METRICS.map(([key,label,icon,role])=>{
      const id=c[key],v=this._val(id);
      let tone="primary";
      if(role==="load")tone=this._loadTone(v.num);
      if(role==="runtime")tone=(st.tone==="warning"||st.tone==="error")?st.tone:"success";
      const bar=role==="load"&&!isNaN(v.num)?`<i class="bar"><u style="width:${Math.max(0,Math.min(100,v.num))}%"></u></i>`:"";
      return `<button class="tile tone-${tone}" data-more="${this._e(id)}" aria-label="${this._e(label.replace(/&shy;/g,""))}: ${this._e(v.value)} ${this._e(v.unit)}">
        <span class="chip"><ha-icon icon="${icon}"></ha-icon></span>
        <span class="lbl">${label}</span>
        <span class="val"><b>${this._e(v.value)}</b>${v.unit?`<em>${this._e(v.unit)}</em>`:""}</span>${bar}
      </button>`;
    }).join("");
    this.shadowRoot.innerHTML=`<style>${EatonUpsCard.css}</style><ha-card class="tone-${st.tone}${bgm?" bgm":""}" style="--s:${sc}">
      ${bgm?`<img class="bgimg" alt="" src="${this._e(img)}">`:""}
      <section class="hero">
        <div class="info">
          <h1>${this._e(c.name)}</h1>
          <div class="pill"><i class="dot"></i><b>${this._e(st.label)}</b></div>
          ${c.show_status_data?`<p>${this._e(st.detail)}</p>`:""}
        </div>
        ${bgm?"":`<div class="art"><img alt="${this._e(c.name)}" src="${this._e(img)}"></div>`}
      </section>
      <section class="tiles">${tiles}</section>
    </ha-card>`;
    const p=this.shadowRoot.querySelector("img");
    if(p)p.onerror=()=>{if(p.dataset.fb!=="1"){p.dataset.fb="1";p.src=DEFAULT_IMAGE;}else p.style.display="none";};
    this.shadowRoot.querySelectorAll("[data-more]").forEach(x=>x.onclick=()=>this._more(x.dataset.more));
    this._built=true;
    this._measure();
  }

  /* Alle Größen in em – die Basisschrift wächst mit der Kartenbreite (iPhone → iPad → Kiosk) und mit "scale". */
  static get css(){return`
    :host{display:block;height:100%;container-type:inline-size;
      --txt:var(--primary-text-color,#111);
      --mut:var(--secondary-text-color,#777);
      --pri:var(--primary-color,#03a9f4);
      --ok:var(--success-color,#4caf50);
      --warn:var(--warning-color,#ff9800);
      --err:var(--error-color,#f44336);
      --line:color-mix(in srgb,var(--txt) 12%,transparent);
      --fill:color-mix(in srgb,var(--txt) 5%,transparent);
      --fill-hi:color-mix(in srgb,var(--txt) 10%,transparent)}
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    /* Hintergrund, Rand, Radius und Blur kommen vom Theme (z. B. Frosted Glass) */
    ha-card{--s:1;font-size:calc(14px*var(--s));height:100%;display:flex;flex-direction:column;gap:1em;padding:calc(16px*var(--s));overflow:hidden;color:var(--txt);
      -webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
    @container (min-width:400px){ha-card{font-size:calc(15px*var(--s))}}
    @container (min-width:600px){ha-card{font-size:calc(17px*var(--s))}}
    @container (min-width:800px){ha-card{font-size:calc(19px*var(--s))}}
    @container (min-width:1000px){ha-card{font-size:calc(22px*var(--s))}}
    .tone-primary{--t:var(--pri)}.tone-success{--t:var(--ok)}.tone-warning{--t:var(--warn)}.tone-error{--t:var(--err)}.tone-neutral{--t:var(--mut)}

    .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,40%);align-items:center;gap:.8em}
    .info{min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:.5em}
    h1{margin:0;font-size:1.7em;font-weight:600;line-height:1.1;letter-spacing:-.01em;overflow-wrap:anywhere}
    .pill{display:inline-flex;align-items:center;gap:.55em;min-height:2.2em;padding:.2em .9em .2em .7em;border-radius:999px;
      background:color-mix(in srgb,var(--t) 16%,transparent);border:1px solid color-mix(in srgb,var(--t) 40%,transparent)}
    .pill b{font-size:1em;font-weight:600}
    .dot{width:.65em;height:.65em;border-radius:50%;background:var(--t);box-shadow:0 0 .6em .05em color-mix(in srgb,var(--t) 70%,transparent)}
    .info p{margin:0;font-size:.9em;color:var(--mut)}
    .art{position:relative;display:flex;justify-content:flex-end;align-items:center;min-width:0}
    /* bewusst ohne filter:blur – schont den Raspberry Pi */
    .art:before{content:"";position:absolute;inset:0 0 0 10%;background:radial-gradient(closest-side,color-mix(in srgb,var(--t) 24%,transparent),transparent);pointer-events:none}
    .art img{position:relative;display:block;max-width:100%;max-height:7.5em;object-fit:contain;filter:drop-shadow(0 .4em .5em rgba(0,0,0,.25))}

    .tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7em}
    .tile{position:relative;min-width:0;min-height:5.6em;display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto 1fr;
      column-gap:.6em;align-items:center;padding:.8em;text-align:left;font:inherit;color:inherit;cursor:pointer;touch-action:manipulation;
      background:var(--fill);border:1px solid var(--line);border-radius:1em}
    .tile:active{background:var(--fill-hi);border-color:color-mix(in srgb,var(--t) 50%,var(--line));transform:scale(.985)}
    @media (hover:hover){.tile:hover{background:var(--fill-hi)}}
    .tile:focus-visible{outline:2px solid var(--t);outline-offset:2px}
    .chip{display:grid;place-items:center;width:2.1em;height:2.1em;border-radius:.65em;background:color-mix(in srgb,var(--t) 18%,transparent);color:var(--t)}
    .chip ha-icon{--mdc-icon-size:1.3em}
    .lbl{font-size:.85em;line-height:1.15;color:var(--mut);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
    .val{grid-column:1/-1;display:flex;align-items:baseline;gap:.3em;min-width:0;margin-top:.45em}
    .val b{font-size:1.9em;font-weight:600;line-height:1;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
    .val em{font-style:normal;font-size:.95em;color:var(--mut);white-space:nowrap}
    .bar{grid-column:1/-1;display:block;height:.3em;border-radius:.2em;margin-top:.6em;background:var(--line);overflow:hidden}
    .bar u{display:block;height:100%;border-radius:inherit;background:var(--t);text-decoration:none;transition:width .4s}

    /* ab ~700 px (iPad hochkant, 10"-Kiosk): Messwerte in einer Reihe, spart Höhe */
    @container (min-width:700px){.tiles{grid-template-columns:repeat(4,minmax(0,1fr))}.art img{max-height:6em}.tile{min-height:5.2em}}
    /* sehr schmal (iPhone SE, schmale Sections-Spalte) */
    @container (max-width:340px){.hero{grid-template-columns:1fr}.art{justify-content:flex-start}.art img{max-height:5em}}

    /* Gerätebild groß im Hintergrund (image_mode: background) – nur Maske + Deckkraft, kein Blur */
    ha-card{position:relative}
    .bgm .hero,.bgm .tiles{position:relative;z-index:1}
    .bgm .hero{grid-template-columns:1fr}
    .bgimg{position:absolute;z-index:0;top:.7em;right:.7em;width:78%;height:13em;object-fit:contain;object-position:right top;opacity:.42;pointer-events:none;
      -webkit-mask-image:radial-gradient(ellipse 62% 70% at 72% 38%,#000 28%,transparent 76%);mask-image:radial-gradient(ellipse 62% 70% at 72% 38%,#000 28%,transparent 76%)}
    @container (max-width:399px){.bgimg{width:92%;right:.4em;opacity:.3}}
    @container (min-width:700px){.bgimg{height:11em}}
    @media (prefers-reduced-motion:reduce){.bar u,.tile{transition:none}}
  `;}
}
if(!customElements.get("eaton-ups-card"))customElements.define("eaton-ups-card",EatonUpsCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==="eaton-ups-card"))window.customCards.push({type:"eaton-ups-card",name:"Eaton UPS Card",description:"Eaton-USV-Card im Glas-Look, optimiert für iPhone, iPad und Hochformat-Kiosk.",preview:true,documentationURL:"https://github.com/BeGiBue/eaton-ups-card"});
console.info(`Eaton UPS Card v${VERSION}`);
