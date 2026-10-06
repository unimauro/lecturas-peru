const fs=require('fs');
const {doc,F}=require('./contenido.js');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let h='';
for(const s of doc.secciones){
  const id=s.h2.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  h+=`<section id="${id}"><h2>${esc(s.h2)}</h2>\n`;
  for(const b of s.bloques){
    if(b.h3) h+=`<h3>${esc(b.h3)}</h3>\n`;
    if(b.p) h+=`<p>${esc(b.p)}</p>\n`;
    if(b.nota) h+=`<p class="nota">${esc(b.nota)}</p>\n`;
    if(b.ul) h+=`<ul>${b.ul.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>\n`;
    if(b.tabla) h+=`<div class="tabla-scroll"><table><thead><tr>${b.tabla.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${b.tabla.filas.map(f=>`<tr>${f.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n`;
  }
  h+='</section>\n';
}
const fuentes=Object.entries(F).map(([k,v])=>`<li id="f-${k}"><a href="${v.url}" rel="noopener">${esc(v.titulo)}</a>. ${esc(v.entidad)}${v.anio?', '+v.anio:''}. <span class="tag">${esc(v.tipo)}</span></li>`).join('\n');
const html=`<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Recomendaciones: el libro y la lectura en el Perú</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,800&family=Archivo:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="estilos.css"></head>
<body>
<a class="saltar" href="#contenido">Ir al contenido</a>
<header class="barra"><div class="barra-in"><a class="marca" href="index.html">El libro en el Perú</a>
<nav aria-label="Secciones"><a href="index.html">Tablero</a><a href="#4-recomendaciones-de-politica-publica">Política pública</a><a href="#5-estrategias-de-innovacion-por-actor">Estrategias por actor</a><a href="#6-hoja-de-ruta">Hoja de ruta</a><a href="descargas/Estudio_Mercado_Libro_Peru_2026.docx" class="destacado">Descargar Word</a></nav></div></header>
<main id="contenido" class="doc">
<h1>${esc(doc.titulo)}</h1>
<p class="lead">${esc(doc.subtitulo)}. ${esc(doc.fecha)}.</p>
${h}
<section id="fuentes"><h2>9. Fuentes</h2><ol class="fuentes">${fuentes}</ol></section>
</main>
<footer class="pie"><p>Estudio independiente. <a href="index.html">Volver al tablero</a>.</p></footer>
</body></html>`;
fs.writeFileSync(require('path').join(__dirname,'..','docs','recomendaciones.html'),html);
console.log('html ok',html.length);
