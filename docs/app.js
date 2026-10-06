(function(){
  const DATA = window.DATA; if(!DATA){return;}
  const D = DATA.datos, F = DATA.fuentes;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const fmt = (v,dec=1) => { const [e,d]=Number(v).toFixed(dec).split('.'); return e.replace(/\B(?=(\d{3})+(?!\d))/g,'.')+(d?','+d:''); };

  /* ---------- Estante (hero) ---------- */
  const estante = document.getElementById('estante');
  const pubs = D.publicaciones.items;
  const cortos = ['Contenidos digitales','Periódicos','Libros','Revistas'];
  pubs.forEach((p,i)=>{
    const el = document.createElement('div');
    el.className = 'lomo l'+i;
    el.innerHTML = `<span class="pct"></span><span class="tit">${cortos[i]}</span>`;
    estante.appendChild(el);
  });
  function pintarEstante(col){
    [...estante.children].forEach((el,i)=>{
      const v = pubs[i][col];
      el.style.height = Math.max(v,8)+'%';
      el.classList.toggle('corto', v<34);
      el.querySelector('.pct').textContent = fmt(v)+' %';
      el.setAttribute('aria-label', `${cortos[i]}: ${fmt(v)} %`);
    });
  }
  pintarEstante(1);
  document.querySelectorAll('[data-ambito]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-ambito]').forEach(x=>x.setAttribute('aria-checked','false'));
    b.setAttribute('aria-checked','true'); pintarEstante(+b.dataset.ambito);
  }));

  /* ---------- Filtro por actor ---------- */
  document.querySelectorAll('[data-actor]').forEach(b=>{
    if(b.tagName!=='BUTTON') return;
    b.addEventListener('click',()=>{
      document.querySelectorAll('#filtro-actor button').forEach(x=>x.setAttribute('aria-checked','false'));
      b.setAttribute('aria-checked','true');
      const a = b.dataset.actor;
      document.querySelectorAll('aside.impl').forEach(el=>{ el.hidden = !(a==='todos' || el.dataset.actor===a); });
    });
  });

  /* ---------- Gráficos ---------- */
  if(!window.Chart){ return; }
  const charts = [];
  function base(){
    Chart.defaults.font.family = css('--sans').replace(/"/g,'');
    Chart.defaults.color = css('--suave');
    Chart.defaults.borderColor = css('--linea');
  }
  function barH(id, items, color, opts={}){
    const ctx = document.getElementById(id); if(!ctx) return;
    charts.push(new Chart(ctx,{type:'bar',
      data:{labels:items.map(x=>x[0]),datasets:[{data:items.map(x=>x[1]),backgroundColor:Array.isArray(color)?color:items.map(()=>color),borderRadius:3,barPercentage:.75}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+fmt(c.raw,opts.dec??1)+(opts.suf??' %')}}},
        scales:{x:{beginAtZero:true,max:opts.max,ticks:{callback:v=>v+(opts.tick??'')}},y:{grid:{display:false},ticks:{color:css('--texto')}}}}}));
  }
  function render(){
    charts.splice(0).forEach(c=>c.destroy());
    base();
    const T=css('--tinta'),O=css('--ocre'),V=css('--verde'),R=css('--rosa'),G='#8A93A8';
    const per = D.libros_perfil.items;
    barH('g-perfil', per, per.map(x=>x[0]==='Rural'?O:(x[0]==='Nacional'?T:G)), {max:100});
    // tipo de lector: barra apilada 100 %
    charts.push(new Chart(document.getElementById('g-tipolector'),{type:'bar',
      data:{labels:['Población 18-64'],datasets:D.tipo_lector.items.map((x,i)=>({label:x[0],data:[x[1]],backgroundColor:[T,O,R][i],borderRadius:2}))},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>` ${c.dataset.label}: ${fmt(c.raw)} %`}}},
        scales:{x:{stacked:true,max:100,ticks:{callback:v=>v+' %'}},y:{stacked:true,grid:{display:false}}}}}));
    barH('g-razones', D.razones_no_lectura.items, D.razones_no_lectura.items.map(x=>x[0]==='Falta de dinero'?O:T), {max:70});
    barH('g-acceso', D.acceso.items, D.acceso.items.map(x=>x[0].startsWith('No ')?R:V), {max:50});
    // ISBN por formato
    const I=D.isbn;
    charts.push(new Chart(document.getElementById('g-isbn'),{type:'bar',
      data:{labels:I.anios,datasets:[{label:'Impreso',data:I.impreso,backgroundColor:T,borderRadius:2},{label:'Digital',data:I.digital,backgroundColor:V,borderRadius:2}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,beginAtZero:true}}}}));
    charts.push(new Chart(document.getElementById('g-agentes'),{type:'line',
      data:{labels:I.anios,datasets:[
        {label:'Editoriales comerciales',data:I.comercial,borderColor:T,backgroundColor:T,tension:.25},
        {label:'Autores-editores',data:I.autor_editor,borderColor:O,backgroundColor:O,tension:.25},
        {label:'Editoriales universitarias',data:I.universitaria,borderColor:V,backgroundColor:V,tension:.25}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true},x:{grid:{display:false}}}}}));
    charts.push(new Chart(document.getElementById('g-ejemplares'),{type:'bar',
      data:{labels:I.anios,datasets:[{data:I.ejemplares.map(v=>v/1e6),backgroundColor:I.anios.map(a=>a===2019?G:O),borderRadius:3}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+fmt(c.raw)+' millones'}}},scales:{y:{beginAtZero:true},x:{grid:{display:false}}}}}));
    const p10 = Object.entries(I.por10k_2024).sort((a,b)=>b[1]-a[1]);
    barH('g-por10k', p10, p10.map(x=>x[0]==='Perú'?O:G), {suf:'', dec:1});
    barH('g-canales', D.compra.canales, [T,R], {max:70});
    barH('g-gasto', D.compra.gasto, D.compra.gasto.map(x=>x[0]==='Rural'?O:T), {suf:' soles', dec:0});
    barH('g-escuela', D.escuela.items, D.escuela.items.map(x=>x[0].includes('*')?R:T), {max:100});
    barH('g-enla', D.enla.items.map(x=>[x[0],x[1]]), D.enla.items.map(x=>x[0].includes('Loreto')?R:(x[0].includes('nacional')?T:G)), {max:50});
    barH('g-digital', D.digital.items, D.digital.items.map(x=>x[0].includes('varias')?O:V), {max:100});
    barH('g-regprod', D.regiones_produccion.items, D.regiones_produccion.items.map((x,i)=>i<4?O:G), {suf:' títulos', dec:0});
    barH('g-natural', D.regiones_lectura.items, [T,G,V], {max:100});
  }
  render();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',render);

  /* ---------- Tablas y listas ---------- */
  const link = id => `<a href="#f-${id}">${F[id]?F[id].entidad:id}</a>`;
  document.querySelector('#t-mercado tbody').innerHTML = D.mercado.items.map(m=>`<tr><td>${m.concepto}</td><td>${m.valor}</td><td>${link(m.fuente)}</td></tr>`).join('');
  document.querySelector('#t-competidores tbody').innerHTML = D.competidores.map(m=>`<tr><td>${m.segmento}</td><td>${m.actores}</td><td>${link(m.fuente)}</td></tr>`).join('');
  document.getElementById('l-vacios').innerHTML = DATA.vacios.map(v=>`<li>${v}</li>`).join('');
  document.getElementById('l-fuentes').innerHTML = Object.entries(F).map(([k,v])=>
    `<li id="f-${k}"><a href="${v.url}" rel="noopener">${v.titulo}</a>. ${v.entidad}${v.anio?', '+v.anio:''}. <span class="tag">${v.tipo}</span></li>`).join('');
})();
