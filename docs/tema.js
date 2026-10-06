/* Conmutador de tema. Claro por defecto; recuerda la elección por visitante. */
(function(){
  "use strict";
  var raiz = document.documentElement;
  function actual(){ return raiz.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function pintar(btn){
    var osc = actual()==='dark';
    btn.textContent = osc ? '☀' : '☾';
    btn.setAttribute('aria-label', osc ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    btn.setAttribute('title', osc ? 'Modo claro' : 'Modo oscuro');
  }
  var btn = document.getElementById('tema');
  if(!btn) return;
  pintar(btn);
  btn.addEventListener('click', function(){
    var nuevo = actual()==='dark' ? 'light' : 'dark';
    raiz.setAttribute('data-theme', nuevo);
    try{ localStorage.setItem('tema', nuevo); }catch(e){}
    pintar(btn);
    if(typeof window.__repintarGraficos==='function'){ try{ window.__repintarGraficos(); }catch(e){} }
  });
})();
