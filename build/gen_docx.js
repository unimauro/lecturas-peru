const fs = require('fs');
const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,Table,TableRow,TableCell,WidthType,ShadingType,BorderStyle,
  LevelFormat,Header,Footer,PageNumber,TableOfContents,PageBreak,ExternalHyperlink} = require('docx');
const {doc,F} = require('./contenido.js');

const TINTA="1E2A4A", OCRE="B7862B", GRIS="5F6675";
const W = 9026; // ancho útil A4 con márgenes 1440
const borde = {style:BorderStyle.SINGLE,size:4,color:"D9DCE2"};
const bordes = {top:borde,bottom:borde,left:borde,right:borde};

function tabla(t){
  const anchos = t.anchos; const suma = anchos.reduce((a,b)=>a+b,0);
  const esc = anchos.map(a=>Math.round(a*W/suma)); esc[esc.length-1] += W-esc.reduce((a,b)=>a+b,0);
  const celda=(txt,i,head)=>new TableCell({borders:bordes,width:{size:esc[i],type:WidthType.DXA},
    shading: head?{fill:"E9ECF4",type:ShadingType.CLEAR,color:"auto"}:undefined,
    margins:{top:70,bottom:70,left:110,right:110},
    children:[new Paragraph({spacing:{after:0},children:[new TextRun({text:String(txt),bold:head,size:19,color:head?TINTA:undefined})]})]});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:esc,
    rows:[new TableRow({tableHeader:true,children:t.cols.map((x,i)=>celda(x,i,true))}),
          ...t.filas.map(f=>new TableRow({children:f.map((x,i)=>celda(x,i,false))}))]});
}

const hijos = [];
// Portada
hijos.push(new Paragraph({spacing:{before:2600,after:200},children:[new TextRun({text:doc.titulo,font:"Georgia",size:60,bold:true,color:TINTA})]}));
hijos.push(new Paragraph({spacing:{after:600},border:{bottom:{style:BorderStyle.SINGLE,size:12,color:OCRE,space:12}},children:[new TextRun({text:doc.subtitulo,font:"Georgia",size:30,color:GRIS})]}));
hijos.push(new Paragraph({children:[new TextRun({text:doc.fecha,size:24})]}));
hijos.push(new Paragraph({spacing:{before:200},children:[new TextRun({text:"Documento de trabajo. Cifras con fuente; vacíos declarados. Versión web y datos en el repositorio del estudio.",size:20,color:GRIS})]}));
hijos.push(new Paragraph({children:[new PageBreak()]}));
hijos.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun("Contenido")]}));
hijos.push(new TableOfContents("Contenido",{hyperlink:true,headingStyleRange:"1-2"}));
hijos.push(new Paragraph({children:[new PageBreak()]}));

for(const s of doc.secciones){
  hijos.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(s.h2)]}));
  for(const b of s.bloques){
    if(b.h3) hijos.push(new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(b.h3)]}));
    if(b.p) hijos.push(new Paragraph({spacing:{after:160},children:[new TextRun(b.p)]}));
    if(b.nota) hijos.push(new Paragraph({spacing:{after:160},children:[new TextRun({text:b.nota,italics:true,color:GRIS,size:20})]}));
    if(b.ul) b.ul.forEach(x=>hijos.push(new Paragraph({numbering:{reference:"vinetas",level:0},spacing:{after:80},children:[new TextRun(x)]})));
    if(b.tabla){ hijos.push(tabla(b.tabla)); hijos.push(new Paragraph({spacing:{after:120},children:[]})); }
  }
}
// Fuentes
hijos.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun("9. Fuentes")]}));
hijos.push(new Paragraph({spacing:{after:160},children:[new TextRun({text:"Consultadas el 6 de octubre de 2026. El tipo de fuente indica su nivel de confiabilidad.",italics:true,color:GRIS,size:20})]}));
Object.entries(F).forEach(([k,v])=>{
  hijos.push(new Paragraph({numbering:{reference:"numeros",level:0},spacing:{after:80},children:[
    new TextRun({text:`${v.entidad}${v.anio?' ('+v.anio+')':''}. `,bold:true,size:20}),
    new TextRun({text:`${v.titulo}. ${v.tipo}. `,size:20}),
    new ExternalHyperlink({link:v.url,children:[new TextRun({text:v.url,style:"Hyperlink",size:18})]})]}));
});

const documento = new Document({
  creator:"Estudio independiente", title:doc.titulo, description:doc.subtitulo,
  styles:{default:{document:{run:{font:"Calibri",size:22}}},
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{font:"Georgia",size:34,bold:true,color:TINTA},paragraph:{spacing:{before:360,after:180},outlineLevel:0}},
      {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{font:"Georgia",size:26,bold:true,color:TINTA},paragraph:{spacing:{before:240,after:120},outlineLevel:1}}]},
  numbering:{config:[
    {reference:"vinetas",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:300}}}}]},
    {reference:"numeros",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:360}}}}]}]},
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:1440,right:1440,bottom:1440,left:1440}}},
    headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:"El libro y la lectura en el Perú – octubre 2026",size:16,color:GRIS})]})]})},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:["Página ",PageNumber.CURRENT," de ",PageNumber.TOTAL_PAGES],size:16,color:GRIS})]})]})},
    children:hijos}]
});
Packer.toBuffer(documento).then(buf=>{
  fs.writeFileSync(require('path').join(__dirname,'..','docs','descargas','Estudio_Mercado_Libro_Peru_2026.docx'),buf);
  console.log('docx ok', buf.length);
});
