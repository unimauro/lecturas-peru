/* Widget de chat del estudio. Sin dependencias. Se conecta al gateway
   definido en chat-config.js (POST con header X-Client-Token). Degrada con
   aviso si no hay token. No renderiza HTML del usuario (texto plano). */
(function(){
  "use strict";
  var CFG = window.CHAT_CONFIG || {};
  var historial = [];               // {role:'user'|'assistant', content}
  var enviando = false;

  function el(tag, cls, txt){ var e=document.createElement(tag); if(cls)e.className=cls; if(txt!=null)e.textContent=txt; return e; }

  /* ---------- Montaje ---------- */
  var boton = el('button','chat-fab'); boton.type='button';
  boton.setAttribute('aria-label','Abrir el asistente del estudio');
  boton.innerHTML = '<span aria-hidden="true">💬</span>';

  var panel = el('div','chat-panel'); panel.hidden = true;
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-label','Asistente del estudio Lecturas en el Perú');

  var cab = el('div','chat-cab');
  cab.appendChild(el('span','pt'));
  cab.appendChild(el('strong',null, CFG.nombre || 'Asistente'));
  var cerrar = el('button','chat-x','×'); cerrar.type='button'; cerrar.setAttribute('aria-label','Cerrar');
  cab.appendChild(cerrar);

  var cuerpo = el('div','chat-cuerpo');
  cuerpo.setAttribute('role','log'); cuerpo.setAttribute('aria-live','polite');

  var sugs = el('div','chat-sugs');
  (CFG.sugerencias||[]).forEach(function(q){
    var b = el('button','chat-sug',q); b.type='button';
    b.addEventListener('click',function(){ if(!enviando){ input.value=q; enviar(); }});
    sugs.appendChild(b);
  });

  var pie = el('form','chat-pie');
  var input = el('input','chat-input'); input.type='text';
  input.placeholder = 'Pregunta sobre lectura o el mercado del libro…';
  input.setAttribute('aria-label','Tu pregunta'); input.autocomplete='off';
  var send = el('button','chat-send','Enviar'); send.type='submit';
  pie.appendChild(input); pie.appendChild(send);

  panel.appendChild(cab); panel.appendChild(cuerpo); panel.appendChild(sugs); panel.appendChild(pie);
  document.body.appendChild(boton); document.body.appendChild(panel);

  /* ---------- Mensajes ---------- */
  function burbuja(role, texto, extraCls){
    var b = el('div','chat-msg '+(role==='user'?'user':'bot')+(extraCls?(' '+extraCls):''));
    b.textContent = texto;
    cuerpo.appendChild(b); cuerpo.scrollTop = cuerpo.scrollHeight;
    return b;
  }

  var saludado = false;
  function saludar(){
    if(saludado) return; saludado = true;
    burbuja('bot','Hola 👋 Soy el asistente del estudio «Lecturas en el Perú». Pregúntame por las cifras de lectura, el mercado editorial o las brechas regionales. No invento datos: cada cifra viene de las fuentes del tablero.');
  }

  function abrir(){ panel.hidden=false; boton.hidden=true; boton.setAttribute('aria-expanded','true'); saludar(); setTimeout(function(){input.focus();},60); }
  function cerrarPanel(){ panel.hidden=true; boton.hidden=false; boton.setAttribute('aria-expanded','false'); boton.focus(); }
  boton.setAttribute('aria-expanded','false');
  boton.addEventListener('click', abrir);
  cerrar.addEventListener('click', cerrarPanel);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !panel.hidden) cerrarPanel(); });

  /* ---------- Envío al gateway ---------- */
  function extraerRespuesta(data){
    if(!data) return null;
    if(typeof data === 'string') return data;
    return data.reply || data.respuesta || data.message || data.content || data.text ||
      (data.choices && data.choices[0] && (data.choices[0].message ? data.choices[0].message.content : data.choices[0].text)) || null;
  }

  function enviar(){
    var texto = (input.value||'').trim();
    if(!texto || enviando) return;
    input.value='';
    burbuja('user', texto);
    historial.push({role:'user', content:texto});

    if(!CFG.endpoint || !CFG.token){
      burbuja('bot','El asistente estará disponible muy pronto. Mientras tanto, puedes explorar las cifras en el tablero y revisar la sección «Vacíos de datos». 📚','aviso');
      return;
    }

    enviando = true; send.disabled = true;
    var cargando = burbuja('bot','Escribiendo…','cargando');

    var mensajes = [{role:'system', content:(CFG.system||'') + ' ' + (CFG.contexto||'')}]
      .concat(historial.slice(-8));

    fetch(CFG.endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json','X-Client-Token':CFG.token},
      body: JSON.stringify({ project: CFG.proyecto, messages: mensajes, system: CFG.system, context: CFG.contexto })
    })
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json().catch(function(){return r.text();}); })
    .then(function(data){
      var resp = extraerRespuesta(data);
      cargando.remove();
      if(resp){ burbuja('bot', String(resp)); historial.push({role:'assistant', content:String(resp)}); }
      else burbuja('bot','No pude interpretar la respuesta del servidor. Intenta de nuevo.','aviso');
    })
    .catch(function(err){
      cargando.remove();
      burbuja('bot','Hubo un problema al conectar con el asistente. Intenta más tarde.','aviso');
      if(window.console) console.warn('[chat] '+err.message);
    })
    .then(function(){ enviando=false; send.disabled=false; input.focus(); });
  }

  pie.addEventListener('submit', function(e){ e.preventDefault(); enviar(); });
})();
